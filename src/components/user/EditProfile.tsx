import { set, ref, child, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database, storage, storageRef } from '../../firebase/firebase';
import { getDownloadURL, uploadBytes } from 'firebase/storage';

const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [petName, setPetName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser?.uid;

  const handleEditProfile = () => {
    set(ref(database, 'users/' + user), {
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
  const fileRead = (e: any) => {
    const file = e.target.files[0];
    const imageRef = storageRef(storage, `images/${user}}`);
    const uploadTask = uploadBytes(imageRef, file);
    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log(downloadURL);
        setPhotoUrl(downloadURL);
      });
    });
  };

  useEffect(() => {
    const dbRef = ref(database);
    const imageRef = storageRef(storage, `images/${user}}`);
    getDownloadURL(imageRef)
      .then((photoUrl) => {
        get(child(dbRef, `users/${user}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setNickName(snapshot.val().nickname);
              setPetName(snapshot.val().petname);
              setEmail(snapshot.val().email);
              setPhotoUrl(photoUrl);
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-3'
            action='#'
            onSubmit={(e) => {
              e.preventDefault();
              handleEditProfile();
            }}
          >
            <div className='flex flex-col justify-center items-center'>
              <img
                src={photoUrl}
                alt='프로필 사진'
                className='rounded-full h-44 mb-6 aspect-square'
              />
              <label
                htmlFor='photo'
                className='flex w-1/3 justify-center rounded-md bg-green mt-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'
              >
                <div>프로필 사진 수정</div>
              </label>
              <input
                onChange={(e) => fileRead(e)}
                type='file'
                name='photo'
                id='photo'
                className='hidden'
              />
            </div>

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
                수정 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
