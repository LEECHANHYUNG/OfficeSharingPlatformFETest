import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { reservationActions } from '../../store/reservation';
import Button from './Button';
import Card from './Card';

const ItemCard = styled(Card)`
  width: 30%;
  min-width: 300px;
  margin: 30px 20px;
  border: 2px solid #999;
  display: inline-block;
  .img {
    position: relative;
    width: 100%;
    height: 250px;
  }
  .img :first-child {
    border-radius: 0.3rem;
  }
  .item-name {
    padding-top: 10px;
    font-size: 1.5rem;
    font-weight: 900;
  }
  .item-description {
    background: #999;
    border-radius: 5px;
    padding-left: 10px;
  }

  .item-price {
    display: flex;
    justify-content: space-between;
    padding: 30px 10px;
    align-items: center;
  }
  .item-price :nth-child(1) {
    font-size: 0.7rem;
    font-weight: 600;
  }
  .item-price :nth-child(2) {
    font-size: 1.2rem;
    font-weight: 600;
  }
  @media screen and (max-width: 1090px) {
    width: 90%;
  }
  @media screen and (min-width: 1090px) and (max-width: 1630px) {
    width: 90%;
  }
  @media screen and (min-width: 1631px) and (max-width: 2499px) {
    width: 10%;
  }

  @media screen and (min-width: 2500px) {
    width: 30%;
  }
`;

const Item = ({ images, type, typeEng, price, timeUnit, availablePerson }) => {
  const [disabledDateList, setDisabledDateList] = useState([]);
  const [ableDateList, setAbleDateList] = useState([]);

  console.log(images);
  const router = useRouter();
  const placeId = router.query.id;
  const dispatch = useDispatch();

  const dateArr = new Date().toLocaleString().slice(0, -1).split('. ');
  const dateString =
    dateArr[0] +
    '-' +
    dateArr[1].padStart(2, '0') +
    '-' +
    dateArr[2].padStart(2, '0');
  const selectTypeHandler = (e) => {
    const selectedItem = e.target.childNodes[0].value;
    dispatch(reservationActions.getReservationItem(selectedItem));
    dispatch(reservationActions.getSelectedTypeEng(typeEng));
    dispatch(reservationActions.getSelectedStartTime(24));
    dispatch(reservationActions.getSelectedEndTime(24));
    dispatch(reservationActions.selectDate(new Date()));
    dispatch(reservationActions.getLoadingState(true));
    setAbleDateList([]);
    setDisabledDateList([]);
    axios({
      url: '/api/main/available-date',
      method: 'post',
      data: {
        placeId,
        type: typeEng,
        date: dateString,
      },
    })
      .then((response) => {
        dispatch(reservationActions.getLoadingState(false));
        if (response.status === 200) {
          response.data.map((elem) => {
            if (!elem.state) {
              setDisabledDateList((prevList) => [
                new Date(elem.date.year, elem.date.month - 1, elem.date.day),
                ...prevList,
              ]);
            } else {
              setAbleDateList((prevList) => [elem, ...prevList]);
            }
          });
        } else if (response.status === 400) {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.response?.data.split(' ').slice(1).join(' '));
      });
  };
  dispatch(reservationActions.getAbleDayList(ableDateList));
  dispatch(reservationActions.getUnableDayList(disabledDateList));
  return (
    <ItemCard>
      <div className="img">
        <Image
          src={images ? images : '/image/default-image.gif'}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>
      <div className="item-name">{type}</div>
      <div className="item-description">최대 {availablePerson}인 이용 가능</div>
      <div className="item-price">
        <div>1{timeUnit || '시간'} 단위 예약</div>
        <div>
          {price}원/{timeUnit || '시간'}
        </div>
      </div>
      <Button type="button" onClick={selectTypeHandler}>
        <input type="hidden" value={type} />
        예약
      </Button>
    </ItemCard>
  );
};

export default Item;
