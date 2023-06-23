import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import useInfo from './useInfo';

const Info = () => {
  const { data, isLoading } = useInfo();
  const [select, setSelect] = useState('Medical');

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  interface Categories {
    [key: string]: string[];
  }

  const categories: Categories = {
    Play: [
      '수영장',
      '학교체육시설',
      '테니스장',
      '야구장',
      '농구장',
      '풋살장',
      '축구장',
      '농구장',
      '골프연습장',
      '구기체육관',
      '학교체육시설',
      '생활체육관',
      '배드민턴장',
      '다목적운동장',
      '간이운동장',
    ],
    Medical: ['동물병원', '동물약국'],
  };

  return (
    <div className='flex flex-wrap'>
      <div className='w-full px-2 py-5'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
            {Object.keys(categories).map((category) => (
              <button
                key={category}
                onClick={() => setSelect(category)}
                className={classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  select === category
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )}
              >
                {category}
              </button>
            ))}
          </Tab.List>
          <div className='relative my-2 rounded-md shadow-sm'>
            <input
              type='text'
              name='search'
              id='search'
              className='block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm leading-6'
              placeholder='검색어를 입력해주세요.'
            />
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Tab.Panels>
              {data?.map((facilities: any) =>
                categories[select].includes(facilities.subjectCategory) ? (
                  <div
                    key={facilities.rnum}
                    className={classNames(
                      'rounded-xl bg-white p-3',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    )}
                  >
                    <ul>
                      {
                        <li className='relative rounded-md p-3 hover:bg-gray-100'>
                          <h3 className='text-sm font-medium leading-5'>{facilities.title}</h3>
                          <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500'>
                            <li>{facilities.subjectCategory}</li>
                            <li>&middot;</li>
                            <li>{facilities.reference} comments</li>
                            <li>&middot;</li>
                            <li>{facilities.venue} shares</li>
                          </ul>
                        </li>
                      }
                    </ul>
                  </div>
                ) : null,
              )}
            </Tab.Panels>
          )}
        </Tab.Group>
      </div>
      {/* <div className='flex flex-col bg-green w-full sm:w-1/2 h-40 my-5'>
        <span>이름</span>
        <span>카테고리</span>
        <span>전화번호</span>
        <span>주소</span>
      </div> */}
    </div>
  );
};
export default Info;
