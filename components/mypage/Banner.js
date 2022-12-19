import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  position: relative;
  top: 80px;
  float: left;
  width: 20vw;
  height: 80vh;
  border-right: 2px solid #111;
  padding-left: 20px;
  padding-top: 20px;
  .title {
    font-size: 0.8rem;
    color: #999;
    margin: 20px 0;
  }
  .title ~ a {
    display: block;
    margin-bottom: 30px;
  }
  .mypage-checkbtn {
    font-size: 30px;
    float: right;
    line-height: 80px;
    margin-right: 40px;
    cursor: pointer;
    display: none;
    line-height: 65px;
  }
  #mypageCheck {
    display: none;
  }
  ul {
    line-height: 20px;
    float: left;
    z-index: auto;
  }
  ul li {
    color: #111;
    display: block;
    line-height: 80px;
    margin: 0 5px;
    cursor: pointer;
  }
  @media screen and (max-width: 1170px) {
    width: 98vw;
    border-right: none;
    text-align: center;
    height: 50px;
    padding: 0;

    .mypage-checkbtn {
      display: block;
    }

    ul {
      position: absolute;
      width: 30vw;
      height: auto;
      background: #2c3e50;
      left: -100%;
      text-align: center;
      transition: all 0.5s;
      z-index: 1000;
    }
    ul li {
      display: block;
      line-height: 40px;
      text-align: center;
      color: #111;
    }

    #mypageCheck:checked + label ~ ul {
      left: 0;
    }
  }
`;

const Banner = () => {
  const hideBannerHandler = () => {
    const mypageCheck = document.getElementById('mypageCheck');
    mypageCheck.checked = false;
  };
  return (
    <Wrapper>
      <input type="checkbox" id="mypageCheck" />
      <label htmlFor="mypageCheck" className="mypage-checkbtn">
        <Image src="/svg/bars3-black.svg" width="35" height="35" />
      </label>
      <ul>
        <div className="title">이용 관리</div>
        <li onClick={hideBannerHandler}>
          <Link href="/mypage/usage">예약 내역</Link>
        </li>
        <li onClick={hideBannerHandler}>
          <Link href="/mypage/comment">댓글 관리</Link>
        </li>
        <li onClick={hideBannerHandler}>
          <Link href="/mypage/review">후기 관리</Link>
        </li>
        <li onClick={hideBannerHandler}>
          <Link href="/mypage/mileage">마일리지 관리</Link>
        </li>
        <div className="title">고객 센터</div>
        <li onClick={hideBannerHandler}>
          <Link href="/mypage/qna">1:1문의</Link>
        </li>

        <div className="title">정보 관리</div>
        <li onClick={hideBannerHandler}>
          <Link href="/mypage/modify">정보 수정</Link>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Banner;
