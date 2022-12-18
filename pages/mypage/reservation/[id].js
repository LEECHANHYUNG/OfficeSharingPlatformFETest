import axios from 'axios';
import { getSession } from 'next-auth/react';
import React from 'react';
import styled from 'styled-components';
import Banner from '../../../components/mypage/Banner';
import Header from '../../../components/mypage/Header';
import Detail from '../../../components/mypage/reservation/Detail';
const Wrapper = styled.section`
  width: 100%;
  .item {
    width: 70vw;
    display: inline-block;
    float: left;
    padding-left: 20px;
    padding-top: 60px;
  }
  @media screen and (max-width: 1170px) {
    width: 100%;
    margin: 0;
  }
  @media screen and (max-width: 858px) {
    h1 {
      font-size: 1.5rem;
    }
    .item {
      width: 100vw;
      padding-left: 10px;
    }
  }
`;

const ReservationDetail = (props) => {
  return (
    <Wrapper>
      <Header userData={props.userData} />
      <Banner />
      <Detail resData={props.resData} payData={props.payData} />
    </Wrapper>
  );
};

export async function getServerSideProps(context) {
  const params = context.params;
  const session = await getSession({ req: context.req });
  let userData = {};
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  const accessToken = session.user.accessToken;
  try {
    const response = await axios({
      url: `${process.env.baseURL}mypage/${params.id}`,
      headers: { Authorization: accessToken },
    });
    if (response.status === 200) {
      return {
        props: response.data,
      };
    } else {
      throw new Error(response.data);
    }
  } catch (error) {
    userData = { message: '로그인 정보 만료' };
  }
  return {
    props: userData,
  };
}

export default ReservationDetail;
