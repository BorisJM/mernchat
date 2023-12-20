import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onlinePeople: [],
  offlinePeople: [],
  allUsers: [],
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Set Online People
    setOnlinePeople(state, action) {
      state.onlinePeople = action.payload;
    },
    // Set Offline People
    setOfflinePeople(state, action) {
      state.offlinePeople = action.payload;
    },
    // Set All Users
    setAllUsers(state, action) {
      state.allUsers = action.payload.filter(
        (u) => u.userId !== action.payload.id
      );
    },
    // Set selected User
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
  },
});

export const {
  setAllUsers,
  setOfflinePeople,
  setOnlinePeople,
  setSelectedUser,
} = usersSlice.actions;

export default usersSlice.reducer;
