import { Link, useLocation } from 'react-router-dom';
import Pow from '../../assets/icons/pow.png';
import DefaultProfile from '../../assets/icons/DefaultProfile.png';
import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useWeather from '../weather/useWeather';
import { translateWeather } from '../weather/translate';

const Navbar = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');
  const navigation = [
    { name: '자유 게시판', link: '/board' },
    { name: '팁 & 정보', link: '/tipinfo' },
    { name: '산책 메이트', link: '/mate' },
    { name: '산책일기', link: '/diary' },
  ];

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const { data, isLoading } = useWeather();

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
                <button
                  type='button'
                  className='flex items-center rounded-full bg-green p-1 px-3 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
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
                </button>

                {/* Profile dropdown */}
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
                            to='/profile/:id/:dog'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            멍멍이 프로필
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }: any) => (
                          <Link
                            to='/'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            로그아웃
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
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
