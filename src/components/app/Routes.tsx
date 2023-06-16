import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Calendar from '../diary/Calendar';
import Board from '../board/Board';
import SignIn from '../user/SignIn';

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/diary' element={<Calendar />}></Route>
      <Route path='/board' element={<Board />}></Route>
      <Route path='/signin' element={<SignIn />}></Route>
    </Routes>
  );
};

export default Routing;
