import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { paymentSliceActions } from '../../store/payment';
import Card from '../ui/Card';

const Wrapper = styled(Card)`
  .type-radio {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .custom-radio input {
    display: none;
  }
  .custom-radio h3 {
    position: relative;
    text-align: left;
    top: -20px;
    left: 20px;
  }
  .custom-radio p {
    position: relative;
    top: -25px;
    left: 40px;
    text-align: left;
    line-height: 1.5rem;
  }
  .radio-btn {
    margin: 10px;
    width: 80%;
    height: 100px;
    border: 3px solid transparent;
    display: inline-block;
    border-radius: 10px;
    posistion: relative;
    text-align: center;
    border: 3px solid #d9dddc;
    cursor: pointer;
  }
  .radio-btn > div {
    width: 25px;
    height: 25px;
    background: #6a9eff;
    position: relative;
    top: -15px;
    left: 100%;
    transform: translateX(-50%);
    border-radius: 50px;
    padding: 3px;
    transition: 0.2s;
    pointer-events: none;
    opacity: 0;
  }
  .custom-radio input:checked + .radio-btn {
    border: 3px solid #6a9eff;
  }
  .custom-radio input:checked + .radio-btn > div {
    opacity: 1;
  }
  .price {
    position: relative;
    top: -40px;
    right: -42%;
  }
`;

const PaymentType = (props) => {
  const dispatch = useDispatch();
  const getSelectedPaymentTypeHandler = (e) => {
    dispatch(paymentSliceActions.getSelectedPaymentType(e.target.value));
  };
  return (
    <Wrapper>
      <h1>결제 방식 선택</h1>
      <div className="type-radio">
        <label className="custom-radio">
          <input
            type="radio"
            name="type"
            value="FULL_PAYMENT"
            onClick={getSelectedPaymentTypeHandler}
          />
          <span className="radio-btn">
            <div>
              <Image src="/svg/checked.svg" width="25" height="25" />
            </div>
            <h3>선결제</h3>
            <i className="price">
              <Image src="/svg/won.svg" width="10" height="10" />
              {(+props.totalPrice).toLocaleString()}
            </i>

            <p>이용 금액을 예약 단계에서 결제.</p>
            <p>
              결제 금액의 5%인
              <Image src="/svg/won.svg" width="10" height="10" />
              {(+props.totalPrice * 0.05).toLocaleString()}이 마일리지로 적립.
            </p>
          </span>
        </label>
        <label className="custom-radio">
          <input
            type="radio"
            name="type"
            value="DEPOSIT"
            onClick={getSelectedPaymentTypeHandler}
          />
          <span className="radio-btn">
            <div>
              <Image src="/svg/checked.svg" width="25" height="25" />
            </div>
            <h3>후결제</h3>
            <i className="price">
              <Image src="/svg/won.svg" width="10" height="10" />
              {(+props.totalPrice * 0.2).toLocaleString()}
            </i>

            <p>이용 금액을 이용 완료 후 결제.</p>
            <p>
              이용 금액의 20%인
              <Image src="/svg/won.svg" width="10" height="10" />
              {(+props.totalPrice * 0.2).toLocaleString()}이 보증금으로 결제
              필요.
            </p>
          </span>
        </label>
      </div>
    </Wrapper>
  );
};

export default PaymentType;