import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageText: "",
  messages: [],
  file: "",
  userLastMessage: {},
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Change user message text
    setMessageText(state, action) {
      state.messageText = action.payload;
    },
    // Set all the messages
    setMessages(state, action) {
      state.messages = action.payload;
    },
    // Set file message
    setFile(state, action) {
      state.file = action.payload;
    },
    // Set user last message
    setUserLastMessage(state, action) {
      state.userLastMessage = action.payload;
    },
  },
});

export const { setMessageText, setMessages, setFile, setUserLastMessage } =
  messagesSlice.actions;

export function getMessages(action, user) {
  if (!user) return;
}

export default messagesSlice.reducer;
