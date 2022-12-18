import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  position: relative;
  top: 30px;
  width: 50vw;
  height: 25vw;
  text-align: center;
  margin: 0 auto;
  padding-bottom: 60px;
  & .left {
    float: left;
    position: relative;
    width: 50%;
    height: 100%;
    object-fit: contain;
    border: 6px solid transparent;
  }
  & .left-img {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  & .right {
    float: right;
    width: 50%;
    height: 100%;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    display: flex;
    flex-wrap: wrap;
  }

  & .right-item {
    position: relative;
    width: 50%;
    height: 50%;
    border-radius: 0;
    border: 6px solid transparent;
  }
  & .right-item:nth-child(2) .right-img {
    border-top-right-radius: 20px;
  }
  & .right-item:nth-child(4) .right-img {
    border-bottom-right-radius: 20px;
  }

  @media screen and (max-width: 1170px) {
    width: 90vw;
    height: 45vw;
  }
`;

const PlaceMainImage = ({ images }) => {
  return (
    <Wrapper>
      <div className="left">
        <Image
          src={images[1] ? images[1] : '/image/default-image.gif'}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="left-img"
          priority
        />
      </div>
      <div className="right">
        <div className="right-item">
          <Image
            src={images[2] ? images[2] : '/image/default-image.gif'}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="right-img"
            priority
          />
        </div>
        <div className="right-item">
          <Image
            src={images[3] ? images[3] : '/image/default-image.gif'}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="right-img"
            priority
          />
        </div>
        <div className="right-item">
          <Image
            src={images[4] ? images[4] : '/image/default-image.gif'}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="right-img"
            priority
          />
        </div>
        <div className="right-item">
          <Image
            src={images[5] ? images[5] : '/image/default-image.gif'}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="right-img"
            priority
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default PlaceMainImage;
