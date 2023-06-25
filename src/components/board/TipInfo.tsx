import React from 'react';
import dummy from './dummy.json';
import SearchForm from '../common/SearchForm';
import { Link } from 'react-router-dom';

const TipInfo = () => {
  return (
    <>
      <SearchForm />
      <ul role='list' className='divide-y divide-gray-100 m-5'>
        {dummy.map((person) => (
          <li key={person.subject} className='flex justify-between gap-x-6 py-5'>
            <div className='flex gap-x-4'>
              <img
                className='h-12 w-12 flex-none rounded-full bg-gray-50'
                src={person.imageUrl}
                alt=''
              />
              <div className='min-w-0 flex-auto'>
                <p className='text-sm font-bold leading-6 text-gray-900'>{person.name}</p>
                <p className='mt-1 font-semibold truncate text-md leading-5 text-gray-500'>
                  {person.subject}
                </p>
              </div>
            </div>
            <div className='hidden sm:flex sm:flex-col sm:items-end'>
              <p className='text-sm leading-6 text-gray-900'>{person.dog}</p>
              {
                <p className='mt-1 text-xs leading-5 text-gray-500'>
                  <time>{person.postTime}</time>
                </p>
              }
            </div>
          </li>
        ))}
      </ul>
      <Link
        to={'/write_post'}
        state={{ boardType: 'tip' }}
        className='absolute right-0 rounded-md bg-green mr-2 px-3 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'
      >
        글쓰기
      </Link>
    </>
  );
};

export default TipInfo;
