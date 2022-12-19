import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Payment from './Payment';
import Refund from './Refund';

const PayMentCard = styled(Card)`
  border: 1px solid #6a9eff;
  margin-left: 150px;
  @media screen and (max-width: 1170px) {
    margin-left: 50px;
    width: 90vw;
  }
  @media screen and (max-width: 858px) {
    margin: 0px;
    width: 98vw;
  }
`;

const Wrapper = styled.section`
  position: relative;
  width: 70vw;
  float: left;
  top: 80px;

  h1 {
    font-size: 32px;
  }
  .left {
    width: 60%;
  }
  .right {
    width: 40%;
  }
  .data {
    font-size: 22px;
    font-weight: 700;
    color: #6a9eff;
    margin-left: 50px;
  }
  .data p {
    font-size: 1rem;
    color: #111;
  }
  .reservation-time {
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .start {
    margin-right: 100px;
  }
  @media screen and (max-width: 1170px) {
    width: 98vw;
    .data {
      font-size: 22px;
      margin-left: 10px;
    }
  }
  @media screen and (max-width: 858px) {
    .data {
      font-size: 13px;
    }
  }
`;
const StyledCard = styled(Card)`
  margin-left: 150px;
  border: 1px solid #6a9eff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  button {
    position: absolute;
    width: 150px;
    bottom: 20px;
    right: 20px;
  }
  @media screen and (max-width: 1170px) {
    margin-left: 50px;
    width: 90vw;
  }
  @media screen and (max-width: 858px) {
    width: 98vw;
    margin-left: 0;

    flex-direction: column;
    .left,
    .right {
      width: 100%;
    }
    .data {
      font-size: 15px;
      margin-left: 10px;
    }
    .reservation-time {
      width: 100%;
    }
    button {
      width: 30%;
      font-size: 13px;
    }
  }
`;
const Detail = (props) => {
  console.log(props);
  const {
    isAvailableReview,
    placeName,
    resCompletedDate,
    resCompletedTime,
    resEndDate,
    resEndTime,
    resStartDate,
    resStartTime,
    roomType,
    usageState,
    savedMileage,
    totalPrice,
  } = props.resData;
  const router = useRouter();
  const session = useSession();
  const cancelReservationHandler = async () => {
    try {
      const response = await axios({
        url: '/api/mypage/cancel',
        method: 'post',
        data: {
          accessToken: session.data.user.accessToken,
          reservationId: router.query.id,
        },
      });
      if (response.status === 200) {
        alert('예약 취소 완료');
        router.replace('/mypage/usage');
      } else {
        throw new Error();
      }
    } catch (error) {
      alert('잠시후 다시 시도해주세요');
    }
  };
  return (
    <Wrapper>
      <header>
        <h1>예약 내역</h1>
      </header>
      <StyledCard>
        <div className="left">
          <div className="place-name">
            <h3>예약 지점</h3>
            <div className="data">{placeName}</div>
          </div>
          <div className="room-type">
            <h3>상품명</h3>
            <div className="data">{roomType}</div>
          </div>
          <div className="res-time">
            <h3>예약 시간</h3>
            <div className="data reservation-time">
              <div className="start">
                <p>시작</p>
                <div className="date">{resStartDate}</div>
                <div className="time">{resStartTime}</div>
              </div>

              <div className="end">
                <p>종료</p>
                <div className="date">{resEndDate}</div>
                <div className="time">{resEndTime}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="pay-time">
            <h3>결제 시간</h3>
            <div className="data">
              <div className="date">{resCompletedDate}</div>
              <div className="time">{resCompletedTime}</div>
            </div>
          </div>
          <div className="usage-state">
            <h3>상태</h3>
            <div className="data">{usageState}</div>
          </div>
          <div className="review">
            <h3>리뷰</h3>
            <div className="data">
              {isAvailableReview ? '작성 가능' : '작성 불가'}
            </div>
          </div>
          <div className="saved-mileage">
            <h3>적립 마일리지</h3>
            <div className="data">{savedMileage}</div>
          </div>
        </div>
        <Button onClick={cancelReservationHandler}>예약 취소</Button>
      </StyledCard>
      <h1>결제 내역</h1>
      <PayMentCard>
        <h1>총 결제 금액</h1>
        <div className="data">{totalPrice.toLocaleString()}</div>
        {Object.keys(props.payData).map((elem) => (
          <div>
            {props.payData[elem].refund ? (
              <Refund
                refund={props.payData[elem].refund}
                key={`refund${elem}`}
              />
            ) : (
              ''
            )}
            <Payment
              totalPrice={totalPrice}
              payData={props.payData[elem].payment}
              key={`payment${elem}`}
            />
          </div>
        ))}
      </PayMentCard>
    </Wrapper>
  );
};

export default Detail;
