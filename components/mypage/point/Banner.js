import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  min-width: 1100px;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;

  & #state,
  & #amount {
    width: 8%;
  }
  & #content {
    width: 51%;
  }

  & #placeName {
    width: 13%;
  }
  & #addTime {
    width: 20%;
  }
`;

const Banner = () => {
  return (
    <Wrapper>
      <div id="state">상태</div>
      <div id="amount">적립금</div>
      <div id="content">내용</div>
      <div id="placeName">지점명</div>
      <div id="addTime">적용 일시</div>
    </Wrapper>
  );
};

export default Banner;
