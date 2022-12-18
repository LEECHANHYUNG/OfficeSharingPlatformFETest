import React from 'react';
import styled from 'styled-components';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const StyledCard = styled(Card)`
  border: 1px solid #6a9eff;
  margin-left: 150px;
  position: relative;
  h1 {
    width: 150px;
    font-size: 30px;
    border-bottom: 1px solid #111;
    padding-bottom: 10px;
  }
  .pay-type {
    position: absolute;
    top: 30px;
    left: 200px;
  }
  main {
    padding: 50px 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 200px;
  }
  main > div {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  main .data {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  @media screen and (max-width: 858px) {
    width: 100%;
    margin-left: 0px;
    main {
      margin-left: 0px;
    }

    main > div {
      width: 90%;
      justify-content: space-between;
    }
  }
`;
const Payment = () => {
  return (
    <StyledCard>
      <h1>결제 내역</h1>
      <div className="pay-type">
        <div className="data">선결제</div>
      </div>
      <main>
        <div className="total-price">
          <h3>총 결제 금액</h3>
          <div className="data">10,000</div>
        </div>
        <div className="real-price">
          <h3>실 결제 금액</h3>
          <div className="data">8,000</div>
        </div>
        <div className="mileage-price">
          <h3>마일리지 결제 금액</h3>
          <div className="data">2,000</div>
        </div>
      </main>
      <Button>
        <a href="https://npg.nicepay.co.kr/issue/IssueLoader.do?TID=nictest04m01162212171859585236&type=0&InnerWin=Y">
          결제 영수증 확인
        </a>
      </Button>
    </StyledCard>
  );
};

export default Payment;
