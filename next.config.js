const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      async redirects() {
        return [
          {
            source: '/place/book',
            destination: '/',
            permanent: true,
          },
          {
            source: '/error',
            destination: '/',
            permanent: true,
          },
        ];
      },
      images: {
        domains: [
          'officesharingplatform-image-server.s3.ap-northeast-2.amazonaws.com',
        ],
      },
      env: {
        baseURL: 'http://localhost:8080/',
        kakaokey: 'dc629edb6c7c6ce0791c0f11c9b5d459',
        signIn: '/auth/signin',
        signUp: 'http://localhost:8080/auth/signup',
        myPage: '/mypage',
        refresh: '/auth/refresh',
        NEXTAUTH_SECRET: 'mysecretofnextjsnextauth',
        main: 'http://localhost:8080/main',
        mainSearch: 'http://localhost:8080/main/search',
      },
    };
  }
  if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      async redirects() {
        return [
          {
            source: '/place/book',
            destination: '/',
            permanent: true,
          },
          {
            source: '/error',
            destination: '/',
            permanent: true,
          },
        ];
      },
      images: {
        domains: [
          'officesharingplatform-image-server.s3.ap-northeast-2.amazonaws.com',
        ],
      },
      env: {
        baseURL:
          'https://port-0-officesharingplatformbetest-883524lbs4i71x.gksl2.cloudtype.app/',
        kakaokey: 'dc629edb6c7c6ce0791c0f11c9b5d459',
        signIn: '/auth/signin',
        signUp: '/auth/signup',
        myPage: '/mypage',
        refresh: '/auth/refresh',
        NEXTAUTH_SECRET: 'mysecretofnextjsnextauth',
        main: 'https://port-0-officesharingplatformbetest-883524lbs4i71x.gksl2.cloudtype.app/main',
        mainSearch:
          'https://port-0-officesharingplatformbetest-883524lbs4i71x.gksl2.cloudtype.app/main/search',
      },
    };
  }
  return {
    images: {
      domains: ['source.unsplash.com/random'],
    },
    env: {
      kakaokey: 'dc629edb6c7c6ce0791c0f11c9b5d459',
      signIn: '/auth/signin',
      signUp: '/auth/signup',
      myPage: '/mypage',
      refresh: '/auth/refresh',
      NEXTAUTH_SECRET: 'mysecretofnextjsnextauth',
      main: 'http://localhost:8080/main',
    },
  };
};
