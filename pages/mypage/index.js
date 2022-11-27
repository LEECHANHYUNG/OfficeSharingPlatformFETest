import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/mypage/Banner';
import Header from '../../components/mypage/header';

const Wrapper = styled.div``;

const Mypage = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <Header />
      <Banner />
      {router.pathname === '/mypage/point'}
    </Wrapper>
  );
};

export default Mypage;
