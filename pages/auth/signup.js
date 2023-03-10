import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Email from '../../components/auth/Email';
import Name from '../../components/auth/Name';
import Password from '../../components/auth/Password';
import Phone from '../../components/auth/Phone';
import Button from '../../components/ui/Button';
import { authSliceActions } from '../../store/auth';
import axios from 'axios';
import AuthHeader from '../../components/ui/AuthHeader';

const SignUp = () => {
  const router = useRouter();
  const emailIsValid = useSelector((state) => state.auth.emailIsValid);
  const passwordIsValid = useSelector((state) => state.auth.passwordIsValid);
  const nameIsValid = useSelector((state) => state.auth.nameIsValid);
  const phoneIsValid = useSelector((state) => state.auth.phoneIsValid);
  const authNumberIsValid = useSelector(
    (state) => state.auth.authNumberIsValid
  );
  const authNumberAuthenticated = useSelector(
    (state) => state.auth.authNumberAuthenticated
  );
  const enteredEmail = useSelector((state) => state.auth.enteredEmail);
  const enteredPassword = useSelector((state) => state.auth.enteredPassword);
  const enteredName = useSelector((state) => state.auth.enteredName);
  const enteredPhone = useSelector((state) => state.auth.enteredPhone);
  const jobRef = useRef();
  const deskRef = useRef();
  const meetingRoomRef = useRef();
  const officeRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);
  const disatch = useDispatch();
  useEffect(() => {
    disatch(authSliceActions.resetValidation());
  }, []);
  useEffect(() => {
    const validityChecker = setTimeout(() => {
      setFormIsValid(
        emailIsValid &&
          passwordIsValid &&
          nameIsValid &&
          phoneIsValid &&
          authNumberIsValid &&
          authNumberAuthenticated
      );
    }, 100);
    return () => {
      clearTimeout(validityChecker);
    };
  }, [
    emailIsValid,
    passwordIsValid,
    nameIsValid,
    phoneIsValid,
    authNumberIsValid,
    authNumberAuthenticated,
  ]);
  const signupHandler = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: '/api/auth/signup',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: enteredEmail,
        password: enteredPassword,
        name: enteredName,
        phoneNumber: enteredPhone,
        job: jobRef.current.value,
        preferType: [
          {
            desk: deskRef.current.checked,
            meetingRoom: meetingRoomRef.current.checked,
            office: officeRef.current.checked,
          },
        ],
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          router.replace('/auth/signin');
        } else if (response.status === 400) {
          throw new Error(response.data.message);
        }
      })
      .catch((err) => {
        console.error(err.response.data);
        alert(err.response.data.split(' ').slice(1).join(' '));
      });
  };
  return (
    <Wrapper>
      <header>
        <AuthHeader />
      </header>
      <section className="signInForm">
        <form onSubmit={signupHandler}>
          <Email signUp />
          <Password />
          <Name />
          <Phone />
          <input type="text" name="job" placeholder="??????" ref={jobRef} />
          <div className="select">
            <p>?????? ?????? ??????</p>
            <div className="selectBox">
              <label htmlFor="desk">
                <input type="checkbox" name="desk" value="true" ref={deskRef} />
                ?????????
              </label>
              <label htmlFor="meeting">
                <input
                  type="checkbox"
                  name="meeting"
                  value="true"
                  ref={meetingRoomRef}
                />
                ?????????
              </label>
              <label htmlFor="office">
                <input
                  type="checkbox"
                  name="office"
                  value="true"
                  ref={officeRef}
                />
                ?????????
              </label>
            </div>
          </div>
          <Button type="submit" disabled={!formIsValid}>
            ????????????
          </Button>
          <p>
            ????????? ????????????????<Link href="/auth/signin">?????????</Link>
          </p>
        </form>
      </section>
    </Wrapper>
  );
};

export default SignUp;
const Wrapper = styled.div`
  position: relative;
  top: 20vh;
  margin: 0 auto;
  border-radius: 6px;
  background-color: white;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  text-align: center;

  .signInForm form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .control {
    width: 100%;
  }
  .control.invalid input {
    border-color: red;
    background: #fbdada;
  }
  .control.invalid input:focus {
    outline: none;
    border-color: #4f005f;
    background: #f6dbfc;
  }
  .signInForm form input {
    width: 80%;
    height: 40px;
    margin: 10px auto;
  }
  Button {
    width: 80%;
    margin-top: 20px;
  }
  .navLink {
    text-align: center;
  }
  .validity-comment {
    text-align: left;
    margin-left: 60px;
    position: relative;
    top: 0px;
    left: 0px;
  }
  .select {
    display: flex;
    width: 80%;
    align-items: start;
    justify-content: flex-start;
    flex-direction: column;
  }
  .select p {
    margin: 0;
  }
  .select .selectBox {
    display: flex;
    align-self: start;
    width: 15px;
    width: 100%;
  }
  .select .selectBox input {
    width: 15px;
    height: 15px;
    margin: 0 5px;
  }
`;
