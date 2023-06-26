import React, { useEffect, useState } from 'react';
import SearchForm from '../common/SearchForm';
import { Link } from 'react-router-dom';
import { child, get, ref } from 'firebase/database';
import { database } from '../../firebase/firebase';

function Board() {
  const [posts, setPosts] = useState<any>([]);
  const [nickName, setNickName] = useState<string>('');
  const [petName, setPetName] = useState<string>('');
  const dbRef = ref(database);

  const readUser = (userKey: any) => {
    get(child(dbRef, `users/${userKey}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const { nickname, petname } = snapshot.val();
          setNickName(nickname);
          setPetName(petname);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    get(child(dbRef, `board/free`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const postsData = Object.values(snapshot.val()).reverse();
          setPosts(postsData);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef]);

  useEffect(() => {
    posts.forEach((post: any) => {
      readUser(post.user);
    });
  }, [posts]);

  return (
    <>
      <SearchForm />
      <ul role='list' className='divide-y divide-gray-200 m-5'>
        {posts.map((post: any) => {
          return (
            <li key={post.id} className='flex justify-between gap-x-6 py-5'>
              <div className='flex gap-x-4'>
                <img
                  className='h-12 w-12 flex-none rounded-full bg-gray-50'
                  // src={person.imageUrl}
                  alt=''
                />
                <div className='min-w-0 flex-auto'>
                  <div className='flex'>
                    <p className='text-sm font-bold leading-6 text-gray-900'>{nickName}</p>
                    <p className='pl-1 text-sm leading-6 text-gray-900'>({petName})</p>
                  </div>
                  <p className='mt-1 font-semibold truncate text-md leading-5 text-gray-500'>
                    {post.content}
                  </p>
                </div>
              </div>
              <div className='sm:flex sm:flex-col sm:items-end'>
                {
                  <p className='mt-7 text-xs leading-5 text-gray-500'>
                    <time>{post.time}</time>
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
