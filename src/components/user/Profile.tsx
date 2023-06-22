import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../../assets/icons/DefaultProfile.png';
import { auth, database } from '../../firebase/firebase';
import { get, child, ref } from 'firebase/database';
const Profile = () => {
  const [nickName, setNickName] = useState('');
  const [petName, setPetName] = useState('');

  const user = auth.currentUser?.uid;

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${user}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNickName(snapshot.val().nickname);
          setPetName(snapshot.val().petname);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='flex sm:mx-auto sm:w-full sm:max-w-sm '>
          <img src={DefaultProfile} alt='' className='rounded-full h-1/3 w-1/3 bg-green' />
          <div className='p-5 flex flex-col justify-center gap-2'>
            <div>
              <span className='text-gray-500'>닉네임 : </span>
              <span className='text-xl'>{nickName}</span>
            </div>
            <div>
              <span className='text-gray-500'>강아지 이름 : </span>
              <span className='text-xl'>{petName}</span>
            </div>
          </div>
        </div>

        <div className='mt-7 sm:mx-auto sm:w-full sm:max-w-sm'>
          <Link
            to='/editProfile'
            type='button'
            className='flex w-full justify-center rounded-md bg-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'
          >
            프로필 수정
          </Link>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='flex w-full justify-between rounded-md bg-hovergreen px-20 py-1.5 text-lg font-bold text-darkgreen shadow-sm '>
            <button className='hover:text-white'>작성 글</button>
            <button className='hover:text-white'>북마크</button>
          </div>
          <div className='bg-green flex flex-col'>
            <span>게시글 렌더링</span>
            <span>게시글 렌더링</span>
            <span>게시글 렌더링</span>
            <span>게시글 렌더링</span>
            <span>게시글 렌더링</span> <span>게시글 렌더링</span> <span>게시글 렌더링</span>
            <span>게시글 렌더링</span> <span>게시글 렌더링</span> <span>게시글 렌더링</span>
            <span>게시글 렌더링</span> <span>게시글 렌더링</span> <span>게시글 렌더링</span>
            <span>게시글 렌더링</span> <span>게시글 렌더링</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
