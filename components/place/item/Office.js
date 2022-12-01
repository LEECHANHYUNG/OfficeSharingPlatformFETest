import React from 'react';
import styled from 'styled-components';
import Card from '../../ui/Card';

const Wrapper = styled(Card)`
  width: 90%;
  height: 80px;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #6a9eff;
  & .description {
    width: 40%;
    font-size: 13px;
  }
  & .description h1 {
    font-size: 1.3rem;
    padding: 0;
    margin-bottom: 5px;
  }
  & .price {
    font-size: 1.3rem;
    color: #6a9eff;
  }
  @media screen and (max-width: 1430px) {
    & .description p {
      display: none;
    }
  }
  @media screen and (max-width: 1170px) {
    & .description p {
      display: block;
    }
  }
`;
const Office = ({ price }) => {
  return (
    <Wrapper>
      <div className="description">
        <h1>사무실</h1>
        <p>장기간 대여 가능 상품입니다.</p>
      </div>
      <div className="price">
        1일 {Number(price).toLocaleString('ko-KR')} ~{' '}
      </div>
    </Wrapper>
  );
};

export default Office;