import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { officeSliceActions } from '../../store/officeList';
import OfficeSearch from '../main/officeList/OfficeSearch';
import PlaceAdditional from './PlaceAdditional';
import PlaceAvailableItem from './PlaceAvailableItem';
import PlaceImage from './PlaceImage';
import PlaceInfo from './PlaceInfo';
import PlaceOpeningHours from './PlaceOpeningHours';

const Wrapper = styled.section`
  position: relative;
  height: 80vh;
  width: 25%;
  overflow-y: scroll;
  
  & .prev-btn {
    z-index: 10;
    position: relative;
    width: 36px;
    height: 36px;
    top: 25px;
    left: 5px;
    cursor: pointer;
  }
  & .detail-btn {
    position: fixed;
    bottom: 0px;
    width: 25%;
    height: 40px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    background: #111;
    color: #fff;
  }
 
  & .line {
    height: 6px;
    background #999;
  }
  @media screen and (max-width: 1170px) {
    width: 100%;
    height: 300px;
    &::-webkit-scrollbar {
      display: none;
    }
    & .detail-btn {
      width: 100%;
    }
  }
`;
const PlaceDetailMain = () => {
  const dispatch = useDispatch();
  const prevBtnHandler = () => {
    dispatch(officeSliceActions.selectPlace(null));
  };
  const selectedPlace = useSelector((state) => state.officeList.selectedOffice);
  return (
    <Wrapper>
      <div className="prev-btn" onClick={prevBtnHandler}>
        <Image src="/svg/arrow-left.svg" width="36" height="36" />
      </div>
      <OfficeSearch />
      <PlaceImage />
      <div className="line"></div>
      <PlaceInfo
        placeName={selectedPlace.item.placeName}
        description={selectedPlace.item.placeDescription}
        address={selectedPlace.item.address}
        rating={selectedPlace.item.ratingPoint}
      />
      <PlaceAdditional additionalItem={selectedPlace.item.placeInfo} />
      <PlaceOpeningHours
        closedDays={selectedPlace.item.closeDays}
        openTime={selectedPlace.item.openTime}
        closeTime={selectedPlace.item.closeTime}
      />
      <PlaceAvailableItem items={selectedPlace.item.roomInfo} />
      <Link href={`/place/${selectedPlace.item.placeId}`}>
        <div className="detail-btn">자세히 보기</div>
      </Link>
    </Wrapper>
  );
};

export default PlaceDetailMain;