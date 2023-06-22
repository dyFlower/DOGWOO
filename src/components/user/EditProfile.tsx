import { set, ref, child, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase/firebase';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [petName, setPetName] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser?.uid;

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `users/${user}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setNickName(snapshot.val().nickname);
          setPetName(snapshot.val().petname);
          setEmail(snapshot.val().email);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEditProfile = () => {
    const user = auth.currentUser;
    set(ref(database, 'users/' + user?.uid), {
      email: email,
      nickname: nickName,
      petname: petName,
    })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-green'>
            DOGWOO
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-3'
            action='#'
            onSubmit={(e) => {
              e.preventDefault();
              handleEditProfile();
            }}
          >
            <div>
              <label
                htmlFor='nickname'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                닉네임
              </label>
              <div>
                <input
                  id='nickname'
                  name='nickname'
                  type='text'
                  onChange={(e) => setNickName(e.target.value)}
                  required
                  value={nickName}
                  className='block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label
                htmlFor='dogname'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                강아지 이름
              </label>
              <div>
                <input
                  id='dogname'
                  name='dogname'
                  type='text'
                  onChange={(e) => setPetName(e.target.value)}
                  value={petName}
                  //   required
                  className='block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                이메일 주소
              </label>
              <div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={email}
                  disabled
                  className='block w-full rounded-md border-0 px-1 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-green mt-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'
              >
                프로필 수정
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
