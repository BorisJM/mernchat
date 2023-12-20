import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "../dataStorage/messages/messagesSlice";
import usersReducer from "../dataStorage/users/usersSlice";
import featuresReducer from "../dataStorage/features/featuresSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    users: usersReducer,
    features: featuresReducer,
  },
});

export default store;
