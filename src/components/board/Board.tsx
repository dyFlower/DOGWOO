import React from 'react';
import DefaultProfile from '../../assets/icons/DefaultProfile.png';
import dummy from './dummy.json';
import SearchForm from '../common/SearchForm';

function Board() {
  console.log(dummy[0].imageUrl);
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
    </>
  );
}

export default Board;
