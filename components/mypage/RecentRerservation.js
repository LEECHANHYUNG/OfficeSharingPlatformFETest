import React from 'react';
import styled from 'styled-components';
import { SwiperSlide, Swiper } from 'swiper/react';
import Card from '../ui/Card';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';

const Wrapper = styled.section`
  margin-top: 40px;
  margin-left: 350px;
  width: 70vw;
  h1 {
    font-size: 2rem;
    text-align: left;
  }
  .place-name {
    margin-left: 20px;
    font-size: 1.3rem;
  }
  .product-type {
    margin-left: 20px;
    font-size: 1.5rem;
  }
  .reservation-time {
    margin-left: 20px;
    font-size: 1.5rem;
  }
  .item {
    width: 450px;
  }
  .break {
    font-size: 1rem;
    font-weight: 900;
    margin-left: 90px;
  }

  @media screen and (max-width: 1170px) {
    margin-left: 0;
    width: 96vw;
  }
`;
const RecentRerservation = ({ item }) => {
  return (
    <Wrapper>
      <h1>최근 예약 상품</h1>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        draggable={false}
        slidesPerView={1}
        breakpoints={{
          858: {
            slidesPerView: 2,
          },
        }}
      >
        {Object.keys(item).map((elem) => (
          <SwiperSlide key={elem} className="item">
            <Card className="current-reservation-data">
              <h3>지점명</h3>
              <div className="place-name">{item[elem].placeName}</div>
              <h3>상품명</h3>
              <div className="product-type">{item[elem].productType}</div>
              <h3>예약 시간</h3>
              <div className="reservation-time">
                {`${item[elem].reservationStartDate}
            ${item[elem].reservationStartTime}`}
              </div>
              <div className="break">{'~'}</div>
              <div className="reservation-time">
                {`${item[elem].reservationEndDate}
              ${item[elem].reservationEndTime}`}
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default RecentRerservation;