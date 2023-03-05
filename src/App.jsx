import React, { useContext } from 'react';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Login from './Components/Login';
import Community from './Components/Community';
import ChatPage from './Components/NewChat/ChatPage';
import './style.scss';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import ForgotPassword from './Components/ForgotPassword';
import Profile from './Components/Profile.jsx';
import PrivateRoute from './Components/hooks/PrivateRoute';
import ChatScreen_home from './Components/ChatScreen_home';
import LandingPage from './Components/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {  

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          {/* Private routing for pages: profile, home, community, chat, friend */}
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/home' element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/home/:channelName' element={<ChatScreen_home />} />
          </Route>
          <Route path='/community' element={<PrivateRoute />}>
            <Route path='/community' element={<Community />} />
          </Route>
          <Route path='/chat' element={<PrivateRoute />}>
            <Route path='/chat' element={<ChatPage />} />
          </Route>
          
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/log-in' element={<Login />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App