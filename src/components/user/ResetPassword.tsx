import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [send, setSend] = useState(false);

  const sendResetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSend(true);
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
          <div>
            <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
              이메일
            </label>
            <div className='mt-2'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                onChange={(e) => setEmail(e.target.value)}
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          {send ? (
            <span className='text-hovergreen text-sm text-right block'>
              비밀번호 재설정 메일이 발송되었습니다.
            </span>
          ) : null}

          <div>
            <button
              onClick={sendResetEmail}
              className='flex w-full mt-5 justify-center rounded-md bg-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'
            >
              비밀번호 재설정
            </button>
          </div>

          <p className='mt-10 text-center text-sm text-gray-500'>
            아직 회원이 아니세요?{' '}
            <Link to='/signup' className='font-semibold leading-6 text-green hover:text-hovergreen'>
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
