import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase/firebase';
import { ref, set } from 'firebase/database';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [petName, setPetName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const user = auth.currentUser;
        set(ref(database, 'users/' + user?.uid), {
          email: email,
          nickname: nickName,
          petname: petName,
        });
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
              handleSignUp(email, password);
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
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
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
                  //   required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
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
                  autoComplete='email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  비밀번호
                </label>
              </div>
              <div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='passwordcheck'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  비밀번호 확인
                </label>
              </div>
              <div>
                <input
                  id='passwordcheck'
                  name='passwordcheck'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'
              >
                회원가입
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            사용중인 계정이 있으세요?{' '}
            <Link to='/signin' className='font-semibold leading-6 text-green hover:text-hovergreen'>
              로그인
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
