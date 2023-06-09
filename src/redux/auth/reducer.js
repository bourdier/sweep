import { createSlice } from '@reduxjs/toolkit';

export const userInitialState = {
  username: null,
  email: null,
  avatar: null,
  isLoggedIn: false,
  token: null,
};

export const userSlice = createSlice({
  name: 'usersData',
  initialState: userInitialState,
  reducers: {
    setAuth: (state, action) => {
      const { username, email, avatar, isLoggedIn, token } = action.payload;
      state.username = username;
      state.email = email;
      state.avatar = avatar;
      state.isLoggedIn = isLoggedIn;
      state.token = token;
    },
  },
});

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;