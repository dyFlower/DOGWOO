import { Link } from 'react-router-dom';
import HomeBg from '../../assets/image/HomeBg.jpg';
import { auth } from '../../firebase/firebase';

function Home() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  console.log(auth.currentUser);
  return (
    <>
      <img className='bg-center absolute -z-10' src={HomeBg} alt='배경화면' />
      <div className='flex flex-wrap justify-center gap-20 sm:mt-32 mt-10'>
        <div className='bg-white p-5 rounded-xl'>
          <div className='mb-5 sm:mb-10'>
            <span className='text-darkgreen font-serif font-extrabold sm:text-7xl text-3xl'>
              DOGWOO : 友
            </span>
          </div>
          <span className=' text-darkgreen font-serif font-extrabold sm:text-3xl text-2xl'>
            주인님과 함께하는 모든 순간이
            <br />
            소중하고 특별한 시간이에요!
          </span>
        </div>
        <Link to='' className='h-fit bg-white rounded-xl p-2 mt-36 text-center'>
          <span className='block sm:text-2xl text-xl font-extrabold'>
            도시공원, 체육공원, 동물병원, 동물약국, 보호센터 등
          </span>
          <span className='font-bold text-md'>반려 동물을 위한 지역 생활정보</span>
          <span className='text-2xl font-bold text-green hover:text-hovergreen sm:inline block'>
            {' '}
            검색하러 가기
          </span>
        </Link>
      </div>
    </>
  );
}

export default Home;
