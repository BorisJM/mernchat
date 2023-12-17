import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../dataStorage/messages/messagesSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});

export default store;
