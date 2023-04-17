import { Avatar, Box, Divider, Tooltip } from '@mui/material';
import React from 'react';
import ProfileForm from './components/profile-form';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { myUser } = useSelector((state) => state.user);



  return (

    <Box sx={{ 
      width: '900px', 
      mt: 10, 
      display: 'flex',
      gap: 10,
      }}>
      
      <Tooltip 
      title="Click to change avatar"
      >
        <Avatar
          src={myUser.user.avatarImage} 
          alt={`${myUser.user.username} avatar`} 
          onClick={() => window.open('https://getavataaars.com/')}
          sx={{
            width: 300,
            height: 300,
            cursor: 'pointer',
          }}
        />
      </Tooltip>

      <Divider orientation="vertical" flexItem />

      <ProfileForm />
    </Box>

  );
};

export default Profile;