import React, { Fragment, useEffect, useRef } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import ControlBox from './ControlBox';
import OfficeMarker from './OfficeMarker';
import classes from './KaKaopMap.module.css';
import FilterBanner from '../../layout/FilterBanner';
const KakaoMap = (props) => {
  const mapRef = useRef();
  useEffect(() => {
    props.setMapHandler(mapRef);
  }, []);
  return (
    <Fragment>
      <FilterBanner />
      <Map
        id="map"
        center={{
          lat: 37.52341236919156,
          lng: 127.05462238047163,
        }}
        className={classes.map}
        level={8}
        ref={mapRef}
      >
        <OfficeMarker map={mapRef} />
        <ControlBox map={mapRef} />
      </Map>
    </Fragment>
  );
};

export default KakaoMap;