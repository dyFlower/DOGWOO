import { useLocation } from 'react-router-dom';
import { getTimegap } from './time';
import DefaultProfile from '../../../assets/icons/DefaultProfile.png';
import { auth } from '../../../firebase/firebase';
const Post = () => {
  const location = useLocation();
  const postData = location.state?.postData;
  const currUser = auth.currentUser?.uid;

  return (
    <>
      <div className='h-screen p-16'>
        <div className='border-2 border-gray-600 rounded-md'>
          <div className='bg-hovergreen p-4 rounded-md text-4xl font-bold'>{postData.title}</div>
          <div className='flex justify-between text-xl p-3'>
            <div className='flex items-center'>
              <img src={DefaultProfile} alt='프로필사진' className='h-8 w-8 mr-2 rounded-full' />
              {postData.userData[0]} ( {postData.userData[1]} )
            </div>
            <div className='text-gray-400 text-lg'>{getTimegap(postData.time)}</div>
          </div>
        </div>
        <div className='p-3 mt-2 bg-gray-50 text-2xl h-3/5 rounded-md border-2 border-gray-600'>
          {postData.content}
        </div>
        {currUser === postData.user ? (
          <div className='flex justify-end gap-3 mt-3'>
            <button className='rounded-md bg-green px-3 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'>
              수정
            </button>
            <button className='rounded-md bg-green px-3 py-1.5 text-md font-semibold text-white shadow-sm hover:bg-hovergreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green'>
              삭제
            </button>
          </div>
        ) : (
          <span className='text-gray-400'>작성자 본인은 수정 및 삭제가 가능합니다.</span>
        )}
      </div>
    </>
  );
};

export default Post;
