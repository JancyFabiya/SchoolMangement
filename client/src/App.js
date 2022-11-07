import React from 'react'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {useSelector} from 'react-redux';
import Addstudent from './components/Addstudent';


function App() {
  const {userAuth} = useSelector(store => store?.users);
  return (
    <>
     {/* <Router> */}
          <Routes>
            <Route path='/' element={userAuth ?<Navigate to ="home" /> :<Navigate to="auth"/>}/>
            <Route path='/auth' element={userAuth ? <Navigate to="../home"/> : <Register/>}/>
            <Route path='/login' element={userAuth ?<Navigate to ="../home" />:<Login/>}/>
            <Route path='/home' element={userAuth ? <Home/> : <Navigate to = "../login"/>}/>
            {/* <Route path='/addStud' element={<Addstudent/>}/> */}
          </Routes>
      {/* </Router> */}
    </>

  );
}

export default App;
