import React, { useState } from 'react';
import { auth, database } from '../../../firebase/firebase';
import { child, push, ref, set } from 'firebase/database';
import { useLocation, useNavigate } from 'react-router-dom';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const boardType = location.state?.boardType;

  const newPostKey = push(child(ref(database), 'posts')).key;

  const handleUploadPost = () => {
    const user = auth.currentUser;
    set(ref(database, `board/${boardType}/${newPostKey}`), {
      user: user?.uid,
      title: title,
      content: content,
      time: Date.now(),
      // photo: photoUrl,
    })
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className='h-screen bg-hovergreen rounded-lg shadow-md p-8 '>
      <h2 className='text-3xl font-bold mb-4'>게시글 작성</h2>
      <form
        className='h-3/5'
        onSubmit={(e) => {
          e.preventDefault();
          handleUploadPost();
        }}
      >
        <div className='mb-4'>
          <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
            제목
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-4'
          />
        </div>
        <div className='mb-4 h-full'>
          <label htmlFor='content' className='block text-gray-700 font-bold mb-2'>
            내용
          </label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className='w-full h-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 py-2 px-4'
          ></textarea>
        </div>
        <button
          type='submit'
          className='absolute right-8 bottom-5 rounded-md bg-green px-3 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'
        >
          게시글 작성
        </button>
      </form>
    </div>
  );
};

export default WritePost;
