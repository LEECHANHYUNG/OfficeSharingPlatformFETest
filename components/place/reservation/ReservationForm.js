import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reservationActions } from '../../../store/reservation';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import DeskMeetingRoomForm from './DeskMeetingRoomForm';
import OfficeForm from './OfficeForm';
const Wrapper = styled(Card)`
  border: 2px solid #111;
  border-radius: 5px;
  width: 450px;
  position: ${(props) =>
    props.isFixed ? (props.isBottom ? 'absolute' : 'fixed') : 'absolute'};
  top: ${(props) =>
    props.isFixed ? (props.isBottom ? '1150px' : '310px') : '0px'};
  h1 {
    font-size: 1.5rem;
  }

  .productForm {
    padding: 20px 20px;
  }
  & .item {
    margin: 30px 0;
    font-weight: 900;
    color: #6a9eff;
  }

  .formInput {
    border: none;
    font-size: 1.5rem;
    margin-left: 20px;
    color: #111;
    font-weight: 500;
    background: #fff;
    width: 80%;
  }
  .payment-btn {
    border-radius: 6px;
    height: 50px;
    width: 70%;
    margin: 0px auto;
    text-align: center;
    line-height: 40px;
    background: #6a9eff;
    font-weight: 900;
  }
  & .time {
    line-height: 40px;
    font-size: 1.2rem;
    font-weight: 800;
    display: block;
    margin-left: 20px;
    color: #111;
  }
  @media screen and (max-width: 1170px) {
    position: relative;
    top: 0px;
    width: 100%;
  }
`;

const ReservationForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isBrowser, setIsBrowser] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const placeId = router.query.id;

  const itemName = useSelector((state) => state.reservation.selectedType);
  const reservationItem = useSelector(
    (state) => state.reservation.reservationItem
  );
  const selectedStartTime = useSelector(
    (state) => state.reservation.selectedStartTime
  );
  const selectedEndTime = useSelector(
    (state) => state.reservation.selectedEndTime
  );
  const selectedTypeEng = useSelector(
    (state) => state.reservation.selectedTypeEng
  );
  useEffect(() => {
    setIsBrowser(true);
  });
  if (isBrowser) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 600 && window.scrollY <= 1750) {
        setIsFixed(true);
        setIsBottom(false);
      } else if (window.scrollY > 1750) {
        setIsBottom(true);
      } else {
        setIsFixed(false);
        setIsBottom(false);
      }
    });
  }

  const selectedDate = useSelector((state) => state.reservation.date);
  const selectedEndDate = useSelector((state) => state.reservation.endDate);
  const dateArr = selectedDate.toLocaleDateString().slice(0, -1).split('. ');
  const endDateArr = selectedEndDate
    .toLocaleDateString()
    .slice(0, -1)
    .split('. ');
  const dateString =
    dateArr[0] +
    '-' +
    dateArr[1]?.padStart(2, '0') +
    '-' +
    dateArr[2]?.padStart(2, '0');
  const endDateString =
    endDateArr[0] +
    '-' +
    endDateArr[1]?.padStart(2, '0') +
    '-' +
    endDateArr[2]?.padStart(2, '0');

  const session = useSession();
  console.log(session);
  const sendReservationInfoHandler = async () => {
    if (session.status === 'unauthenticated') {
      alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
      router.push('/auth/signin');
    }
    try {
      const response = await axios({
        url: '/api/reservation/book',
        method: 'post',
        data: {
          accessToken: session.data.user.accessToken,
          id: placeId,
          selectedType: selectedTypeEng,
          startDate: dateString,
          endDate: endDateString,
          startTime: selectedStartTime,
          endTime: +selectedEndTime + 1,
        },
      });
      if (response.status === 200) {
        dispatch(reservationActions.getReservationInfo(response.data));
        alert('예약 페이지로 이동합니다.');
        router.push('/place/book');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error.response);
      alert(error.response.data.message.split(' ').slice(1).join(' '));
    }
  };
  return (
    <Wrapper isFixed={isFixed} isBottom={isBottom}>
      <div className="productForm">
        {reservationItem ? (
          <h1>예약 신청</h1>
        ) : (
          <h1>상품 타입을 선택해주세요</h1>
        )}
        {itemName ? (
          <div className="item">
            <label htmlFor="selectProduct">선택 상품명</label>
            <input
              type="text"
              value={reservationItem || ''}
              disabled
              className="formInput"
            />
          </div>
        ) : (
          ''
        )}
        {(itemName === 'desk') | (itemName === 'meetingRoom') ? (
          <DeskMeetingRoomForm />
        ) : (
          ''
        )}
        {itemName === 'office' ? <OfficeForm /> : ''}
        {reservationItem &&
        selectedStartTime !== 24 &&
        selectedEndTime !== 24 ? (
          <div className="payment-btn">
            <Button onClick={sendReservationInfoHandler}>예약</Button>
          </div>
        ) : (
          ''
        )}
      </div>
    </Wrapper>
  );
};

export default ReservationForm;
