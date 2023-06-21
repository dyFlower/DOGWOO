import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pow from '../../assets/icons/pow.png';
import DefaultProfile from '../../assets/icons/DefaultProfile.png';
import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useWeather from '../weather/useWeather';
import { translateWeather } from '../weather/translate';
import { auth } from '../../firebase/firebase';

const Navbar = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');
  const navigate = useNavigate();
  const navigation = [
    { name: '자유 게시판', link: '/board' },
    { name: '팁 & 정보', link: '/tipinfo' },
    { name: '산책 메이트', link: '/mate' },
  ];

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const { data, isLoading } = useWeather();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate('/');
    });
  };

  return (
    <Disclosure as='nav' className='bg-darkgreen'>
      {({ open }: any) => (
        <>
          <div className='mx-auto max-w-8xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>메인 메뉴 열기</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <Link to='/'>
                    <img className='block h-8 w-auto lg:hidden' src={Pow} alt='Home' />
                  </Link>
                  <Link to='/'>
                    <img className='hidden h-8 w-auto lg:block' src={Pow} alt='Home' />
                  </Link>
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.link}
                        className={classNames(
                          currentPage === item.link
                            ? 'bg-gray-700 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <Popover className='z-10'>
                  <Popover.Button className='flex items-center rounded-full bg-green p-1 px-3 text-white hover:bg-hovergreen focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                    <span className='sr-only'>날씨</span>
                    {isLoading ? 'Loading...' : translateWeather(data?.weather[0].main)}
                    {isLoading ? (
                      ''
                    ) : (
                      <img
                        className='h-8 w-8'
                        src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                        alt='날씨'
                      />
                    )}
                  </Popover.Button>
                  <Transition
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Popover.Panel className='absolute z-10 top-2 right-1'>
                      <div className='rounded-md bg-gray-100 p-5 flex-row'>
                        <span className='block font-bold text-3xl'>{data?.name}</span>
                        <span className='block font-semibold text-2xl text-center'>
                          {data?.main.temp}°
                        </span>
                        <div>
                          <span className='text-gray-400'>체감 : </span>
                          <span className=''>{data?.main.feels_like}°</span>
                        </div>
                        <div>
                          <span className='text-gray-400'>습도 : </span>
                          <span className=''>{data?.main.humidity} %</span>
                        </div>
                        <div>
                          <span className='text-gray-400'>풍속 : </span>
                          <span className=''>{data?.wind.speed} m/s</span>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>

                {/* Profile dropdown */}
                {auth.currentUser ? (
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='sr-only'>프로필 정보 열기</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src={DefaultProfile}
                          alt='프로필 사진'
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }: any) => (
                            <Link
                              to='/profile/:id'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              내 프로필
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: any) => (
                            <Link
                              to='diary'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              산책 일기
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }: any) => (
                            <button
                              onClick={handleSignOut}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              로그아웃
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    to='/signin'
                    className='flex ml-2 items-center rounded-full bg-gray-600 p-1 px-3 text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  >
                    로그인
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.link}
                  className={classNames(
                    currentPage === item.name
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
