import React, { useEffect, useState } from 'react';
import SearchForm from '../common/SearchForm';
import { Link, useParams } from 'react-router-dom';
import { child, get, ref } from 'firebase/database';
import { database } from '../../firebase/firebase';
import { getTimegap } from './post/time';
import DefaultProfile from '../../assets/icons/DefaultProfile.png';

function Board() {
  const [posts, setPosts] = useState<any>([]);
  const dbRef = ref(database);
  const { id } = useParams();

  const readUser = async (userKey: any) => {
    try {
      const snapshot = await get(child(dbRef, `users/${userKey}`));
      if (snapshot.exists()) {
        const { nickname, petname } = snapshot.val();
        return [nickname, petname];
      } else {
        throw new Error('No data available');
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(child(dbRef, `board/free`));
        if (snapshot.exists()) {
          const postsData = snapshot.val();
          const postKeys = Object.keys(postsData);
          const promises = postKeys.map((postKey) => readUser(postsData[postKey].user));
          const userData = await Promise.all(promises);
          const postUserData = postKeys.map((postKey, index) => ({
            ...postsData[postKey],
            userData: userData[index],
            postKey: postKeys[index],
          }));
          setPosts(postUserData);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dbRef]);

  return (
    <>
      <SearchForm />
      <ul role='list' className='divide-y divide-gray-200 m-5'>
        {Object.values(posts)
          .reverse()
          .map((post: any, id: number) => {
            const postNum = posts.length - id;
            return (
              <li key={id} className='flex justify-between gap-x-6 py-5'>
                <Link
                  to={`post/${postNum}`}
                  state={{ postData: post, boardType: 'free' }}
                  className='flex gap-x-4'
                >
                  <img
                    className='h-12 w-12 flex-none rounded-full bg-gray-300'
                    src={DefaultProfile}
                    alt='프로필 사진'
                  />
                  <div className='flex flex-col gap-y-1'>
                    <div className='flex'>
                      <p className='text-sm font-semibold leading-6 text-gray-900'>
                        {post.userData[0]}
                      </p>
                      <p className='pl-1 text-sm leading-6 text-gray-900'>({post.userData[1]})</p>
                    </div>
                    <p className='font-semibold truncate text-md leading-5'>{post.title}</p>
                  </div>
                </Link>
                <div className='sm:flex sm:flex-col sm:items-end'>
                  {
                    <p className='mt-7 text-xs leading-5 text-gray-500'>
                      <time>{getTimegap(post.time)}</time>
                    </p>
                  }
                </div>
              </li>
            );
          })}
      </ul>
      <Link
        to={'/write_post'}
        state={{ boardType: 'free' }}
        className='absolute right-0 rounded-md bg-green mr-2 px-3 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'
      >
        글쓰기
      </Link>
    </>
  );
}

export default Board;
