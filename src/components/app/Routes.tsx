import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Calendar from '../diary/Calendar';
import Board from '../board/Board';
import SignIn from '../user/SignIn';
import TipInfo from '../board/TipInfo';
import MateBoard from '../board/MateBoard';
import Profile from '../user/Profile';
import SignUp from '../user/SignUp';
import ResetPassword from '../user/ResetPassword';
import EditProfile from '../user/EditProfile';
import Info from '../info/Info';
import Post from '../board/post/Post';
import WritePost from '../board/post/WritePost';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/diary' element={<Calendar />}></Route>
      <Route path='/info' element={<Info />}></Route>
      <Route path='/board' element={<Board />}></Route>
      <Route path='/tipinfo' element={<TipInfo />}></Route>
      <Route path='/mate' element={<MateBoard />}></Route>
      <Route path='/write_post' element={<WritePost />}></Route>
      <Route path='/signin' element={<SignIn />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/reset' element={<ResetPassword />}></Route>
      <Route path='/profile'>
        <Route path=':id' element={<Profile />}></Route>
      </Route>
      <Route path='/editProfile' element={<EditProfile />}></Route>
    </Routes>
  );
};

export default Router;
