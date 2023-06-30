import React, { useState } from 'react';

const SearchForm = () => {
  const [searchOption, setSearchOption] = useState('제목');
  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearchOption(e.target.value);
  };

  return (
    <div>
      <div className='relative m-3 rounded-md shadow-sm'>
        <input
          type='text'
          name='search'
          id='search'
          className='block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6'
          placeholder='검색어를 입력해주세요.'
        />
        <div className='absolute inset-y-0 right-0 flex items-center'>
          <label htmlFor='searchFor' className='sr-only'>
            검색할것
          </label>
          <select
            onChange={handleChange}
            id='searchFor'
            name='searchFor'
            className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 text-sm'
          >
            <option value='제목'>제목</option>
            <option value='작성자'>작성자</option>
            <option value='강아지'>강아지</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
