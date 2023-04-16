import React from 'react';
import { Box, Container } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './components/navbar/appbar';
import RegisterPage from './pages/register/register-page';
import HomePage from './pages/home/home-page';
import LoginPage from './pages/login/login-page';
import { useDispatch } from 'react-redux';
import ProfilePage from './pages/profile/profile-page';
import ChangePassword from './pages/profile/components/change-password';
import ConversationPage from './pages/conversation/conversation-page';
import ChatPage from './pages/chat/chat-page';
import UserProfilePage from './pages/user-profile/user-profile-page';
import NavigationProvider from './helpers/navigation-context';

const App = () => {

  const dispatch = useDispatch();

  const userSecret = localStorage.getItem('userSecret');
  const username = localStorage.getItem('username');
  const avatarImage = localStorage.getItem('avatarImage');

  React.useEffect(() => {
    if (userSecret && username) {
      console.log({
        'userSecret': userSecret,
        'username': username,
    });
      dispatch({ type: 'user/login', payload: { userSecret, username, avatarImage } });
    }
  }, [userSecret, username, avatarImage, dispatch]);

  return (
    <BrowserRouter>
        <NavigationProvider>

      <ResponsiveAppBar />

      <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path='/profile/:username' element={<ProfilePage />} />
          <Route path='/userProfile/:username' element={<UserProfilePage />} />
          <Route path='/change-password/:username' element={<ChangePassword />} />
          <Route path='/chats' element={<ConversationPage />} />
          <Route path='/chat/:id' element={<ChatPage />} />


          <Route path="*" element={<Box>404 Not Found</Box>} />

        </Routes>
      </Container>

        </NavigationProvider>
    </BrowserRouter>
  );
};

export default App;
