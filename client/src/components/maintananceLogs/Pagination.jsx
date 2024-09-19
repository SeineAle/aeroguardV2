import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { useRecoilState } from 'recoil';
import { filterState } from '../../state';

const PageSlider = ({ currentPage, maxPages, limit }) => {
  console.log({ currentPage, maxPages, limit })
  const [filter, setFilter] = useRecoilState(filterState);

  const onChange = (current, pageSize) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
      limit: pageSize,
    }));
    console.log('Updated filter:', { ...filter });
  };

  return (
    <div className='flex flex-col items-center'>
      <Pagination
        total= {parseInt(maxPages)}
        showSizeChanger
        onChange={onChange}
        current={filter.page}
        
      />
    </div>
  );
};

export default PageSlider;
