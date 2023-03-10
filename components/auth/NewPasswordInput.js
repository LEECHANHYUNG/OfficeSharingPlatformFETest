import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { authSliceActions } from '../../store/auth';
import Button from '../ui/Button';
import Input from '../ui/Input';
const Wrapper = styled.section`
  position: absolute;
  top: 300px;
  left: 0px;
  border: 3px solid #111;
  border-radius: 5px;
  margin-top: 30px;
  padding: 0 30px;
  width: 100%;
  height: 300px;
  padding-top: 30px;
  label {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;
const NewPasswordInput = () => {
  const [passwordBlur, setPasswordBlur] = useState(false);
  const [passwordSecondBlur, setPasswordSecondBlur] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const passwordIsValid = useSelector((state) => state.auth.passwordIsValid);
  const email = useSelector((state) => state.auth.enteredEmail);
  const tel = useSelector((state) => state.auth.enteredPhone);
  const dispatch = useDispatch();
  const router = useRouter();
  const passwordSecondIsValid = useSelector(
    (state) => state.auth.passwordSecondIsValid
  );
  const formSbumitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: '/api/auth/finduserinfo',
        method: 'post',
        data: {
          url: 'main/findpw',
          email,
          tel,
          password,
          checkPassword,
        },
      });
      if (response.status === 200) {
        console.log(response.data.msg);
        alert(response.data.msg);
        router.replace('/auth/signin');
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    if (passwordSecondIsValid !== null && passwordIsValid !== null) {
      setFormIsValid(passwordIsValid && passwordSecondIsValid);
    }
  }, [passwordIsValid, passwordSecondIsValid]);
  const passwordChangeHandler = (e) => {
    dispatch(authSliceActions.getPasswordValid(e.target.value));
    setPassword((prevValue) => (prevValue = e.target.value));
  };
  const validatePasswordHandler = (e) => {
    dispatch(authSliceActions.getPasswordValid(e.target.value));
    setPasswordBlur(true);
  };
  const passwordSecondChangeHandler = (e) => {
    dispatch(authSliceActions.getPasswordSecondValid(e.target.value));
    setCheckPassword((prevValue) => (prevValue = e.target.value));
  };
  const validatecheckedPasswordHandler = (e) => {
    dispatch(authSliceActions.getPasswordSecondValid(e.target.value));
    setPasswordSecondBlur(true);
  };
  return (
    <Wrapper>
      <div className="item">
        <div className="type"></div>
        <div className="value"></div>
      </div>
      <div className="item">
        <div className="type"></div>
        <div className="value"></div>
      </div>
      <form onSubmit={formSbumitHandler}>
        <label htmlFor="password">????????? ???????????? ??????</label>
        <div>
          {!passwordIsValid &&
            passwordBlur &&
            '?????? ????????????/??????/???????????? ?????? 8~15??????'}
        </div>
        <Input
          type="password"
          name="password"
          placeholder="????????????*"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          className={`${passwordIsValid === false ? ' invalid' : ''}`}
          minLength="8"
          maxLength="15"
          required
        />
        <label htmlFor="password">???????????? ?????? ??????</label>
        <div>
          {!passwordSecondIsValid &&
            passwordSecondBlur &&
            '?????? ????????????/??????/???????????? ?????? 8~15??????'}
        </div>
        <Input
          type="password"
          name="password"
          placeholder="???????????? ??????*"
          onChange={passwordSecondChangeHandler}
          onBlur={validatecheckedPasswordHandler}
          className={`${passwordSecondIsValid === false ? ' invalid' : ''}`}
          minLength="8"
          maxLength="15"
          required
        />
        <Button type="submit" disabled={!formIsValid}>
          ???????????? ??????
        </Button>
      </form>
    </Wrapper>
  );
};

export default NewPasswordInput;
