import React from 'react';
import HomeBg from '../../assets/image/HomeBg.jpg';

function Home() {
  return (
    <>
      <div>
        <img className='bg-center' src={HomeBg} alt='배경화면' />

        <div className='bg-white sm:absolute top-1/3 left-20 rounded-xl '>
          <div className='mb-10'>
            <span className='text-7xl text-darkgreen  font-serif font-extrabold'>DOGWOO : 友</span>
          </div>
          <span className=' text-darkgreen text-3xl font-serif font-extrabold'>
            주인님과 함께하는 모든 순간이
            <br />
            소중하고 특별한 시간이에요!
          </span>
        </div>
      </div>
    </>
  );
}

export default Home;
