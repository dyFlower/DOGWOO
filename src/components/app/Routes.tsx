import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Calendar from '../diary/Calendar';
import Board from '../board/Board';
import SignIn from '../user/SignIn';
import TipInfo from '../board/TipInfo';
import MateBoard from '../board/MateBoard';
import Profile from '../user/Profile';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/diary' element={<Calendar />}></Route>
      <Route path='/board' element={<Board />}></Route>
      <Route path='/tipinfo' element={<TipInfo />}></Route>
      <Route path='/mate' element={<MateBoard />}></Route>
      <Route path='/signin' element={<SignIn />}></Route>
      <Route path='/profile' element={<Profile />}>
        <Route path=':id'></Route>
      </Route>
    </Routes>
  );
};

export default Routing;
