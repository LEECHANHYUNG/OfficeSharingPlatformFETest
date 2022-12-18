import styled from 'styled-components';
import OfficeItemList from './OfficeItemList';
import OfficeSearch from './OfficeSearch';

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 25vw;
  height: 100vh;
  background: #fff;
  overflow-y: scroll;
  padding-top: 100px;

  @media screen and (max-width: 1170px) {
    padding-top: 54px;
    top: 57vh;
    width: 100%;
    height: 43vh;
  }
`;

const OfficeList = (props) => {
  return (
    <Wrapper>
      <OfficeSearch className="search" />
      <OfficeItemList map={props.map} />
    </Wrapper>
  );
};

export default OfficeList;
