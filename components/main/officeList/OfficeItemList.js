import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import OfficeItem from './OfficeItem';

const OfficeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding-top: 58px;
  & .count {
    display: inline-block;
    color: #6a9eff;
    font-weight: 700;
  }
  @media screen and (max-width: 1170px) {
    padding-top: 0px;
    height: 70px;
  }
`;
const OfficeItemList = (props) => {
  const officeList = useSelector((state) => state.officeList.filteredPlaceList);

  return (
    <Fragment>
      <OfficeCount>
        <p className="count">{officeList?.length}</p>개의 place가 있습니다.
      </OfficeCount>
      {officeList?.map((elem) => {
        return <OfficeItem key={elem.key} elem={elem} map={props.map} />;
      })}
    </Fragment>
  );
};

export default OfficeItemList;
