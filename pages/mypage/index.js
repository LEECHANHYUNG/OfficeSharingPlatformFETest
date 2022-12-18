import axios from 'axios';
import { getSession } from 'next-auth/react';
import React, { Fragment } from 'react';
import Banner from '../../components/mypage/Banner';
import CurrentReservation from '../../components/mypage/CurrentReservation';
import Header from '../../components/mypage/Header';
import RecentRerservation from '../../components/mypage/RecentRerservation';

const Mypage = (props) => {
  return (
    <Fragment>
      <Header userData={props.userData} />
      <Banner />
      <CurrentReservation item={props.currentResData} />
      <RecentRerservation item={props.recentResData} />
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  try {
    const response = await axios({
      url: `${process.env.baseURL}mypage`,
      headers: { Authorization: session.user.accessToken },
      rejectUnauthorized: false,
    });
    if (response.status === 200) {
      return {
        props: response.data,
      };
    } else {
      throw new Error();
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
}

export default Mypage;
