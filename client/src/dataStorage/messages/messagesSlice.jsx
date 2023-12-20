import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      if (action?.payload?.type === "receive") {
        state.messages = [...state.messages, ...action.payload.payload];
      } else {
        state.messages = action.payload;
      }
    },
    // Set file message
    setFile(state, action) {
      state.file = action.payload;
    },
    // Set user last message
    setUserLastMessage(state, action) {
      state.userLastMessage = { ...state.userLastMessage, ...action.payload };
    },
  },
});

export const { setMessageText, setMessages, setFile, setUserLastMessage } =
  messagesSlice.actions;

export function getMessages(action, payload) {
  if (!payload) return;

  // Fetching all the messages
  if (action.type === "GET_MESSAGES") {
    return async function (dispatch) {
      axios.get("/api/messages/getMessages/" + payload.user).then((res) => {
        dispatch(setMessages(res.data.messages));
      });
    };
  }
  // Fetching each user last messages
  if (action.type === "GET_LAST_MESSAGES") {
    return async function (dispatch) {
      const userMessages = {};
      await payload.allUsers.forEach((user) => {
        axios
          .get("/api/messages/getMessages/" + user.userId)
          .then((res) => {
            if (!res.data.messages) return;
            else {
              userMessages[user.userId] =
                res.data.messages[res.data.messages.length - 1];
            }
          })
          .then(() => dispatch(setUserLastMessage(userMessages)));
      });
    };
  }
}

export default messagesSlice.reducer;
