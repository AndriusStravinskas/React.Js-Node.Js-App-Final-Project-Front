// sukurt redux feature  - user

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    myUser: {
      loggedIn: localStorage.getItem('userSecret') ? true : false,
      user: {
        username: '',
        userSecret: '',
        avatarImage: '',
      }
    },
    allUsers: [],
    userChat: [],
    conversation: null,
    otherUser: null,
  },
  reducers: {

    login: (state, action) => {
      state.myUser.loggedIn = true;
      state.myUser.user.username = action.payload.username;
      state.myUser.user.userSecret = action.payload.userSecret;
      state.myUser.user.avatarImage = action.payload.avatarImage;
    },

    allUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    allUserChat: (state, action) => {
      state.userChat = action.payload;
    },

    setConversation: (state, action) => {
      state.conversation = action.payload;
    },

    setOtherUser: (state, action) => {
      state.otherUser = action.payload;
    }

},

});

export const { 
  login,
  allUsers,
  allUserChat,
  setConversation,
  setOtherUser
} = userSlice.actions;

export default userSlice.reducer;