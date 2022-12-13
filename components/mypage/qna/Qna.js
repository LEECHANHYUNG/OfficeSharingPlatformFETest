import { useSession } from 'next-auth/react';
import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import Banner from './Banner';
import QnaItem from './QnaItem';

const Wrapper = styled.section`
  width: 70vw;
  h1 {
    font-size: 2rem;
    margin-top: 20px;
  }
  .itemlist {
    width: 100%;
  }
  .paginationBtns {
    width: 80%;
    padding-top: 50px;
    margin: auto;
    height: 40px;
    list-style: none;
    display: flex;
    justify-content: center;
  }
  .paginationBtns a {
    padding: 10px;
    margin: 8px;
    border-radius: 5px;
    border: 1px solid #111;
    color: #111;
    cursor: pointer;
  }
  .paginationBtns a:hover {
    color: #fff;
    background: #2b2eff;
  }
  .paginationActive a {
    color: #111;
    background: #6a9eff;
  }

  @media screen and (max-width: 1170px) {
    width: 90vw;
    margin: 0 auto;
  }
`;

const Qna = ({ item, paginationData }) => {
  const [totalPage, setTotalPage] = useState(paginationData);
  const [items, setItems] = useState(item);
  const session = useSession();
  const changePageHandler = async ({ selected }) => {
    try {
      const response = await axios({
        url: `/api/mypage/mypage`,
        method: 'post',
        data: {
          url: 'mypage/qna?page=',
          accessToken: session.data.user.accessToken,
          page: selected,
        },
      });

      if (response.status === 200) {
        setItems(response.data.commentData);
        setTotalPage(response.data.paginationData.maxPage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Wrapper>
      <h1>1:1 문의</h1>
      <Banner />
      <div className="itemList">
        {Object.keys(item).map((elem) => (
          <QnaItem item={item[elem]} key={item[elem].questionData.inquiryId} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={totalPage}
        onPageChange={changePageHandler}
        containerClassName={'paginationBtns'}
        previousLinkClassName={'previousBtn'}
        nextLinkClassName={'nextBtn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
    </Wrapper>
  );
};

export default Qna;
