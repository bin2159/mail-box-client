import { createSlice } from "@reduxjs/toolkit";
const initialState = { outbox: [], inbox: [], unRead: 0 };
const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    outboxEmail(state, action) {
      // state.outbox.push(...action.payload)
      if (Array.isArray(action.payload)) {
        state.outbox = action.payload;
      } else {
        state.outbox = [];
      }
    },
    addOutboxEmail(state, action) {
      state.outbox = [...state.outbox, action.payload];
    },

    inboxEmail(state, action) {
      if (Array.isArray(action.payload)) {
        state.inbox = action.payload;
        state.unRead++;
      } else {
        state.inbox = [];
        state.unRead = 0;
      }
    },
    unReadInboxEmail(state, action) {
      if (state.inbox.length > 0) {
        state.unRead = state.inbox.reduce(
          (acc, cur) => acc + (cur[1].read ? 0 : 1),
          0
        );
      }
    },
    deleteInboxEmail(state, action) {
      state.inbox = state.inbox.filter((email) => email[0] !== action.payload);
    },
    deleteOutboxEmail(state, action) {
      state.outbox = state.outbox.filter(
        (email) => email[0] !== action.payload
      );
    },
    readInboxEmail(state, action) {
      const readData = state.inbox.findIndex(
        (email) => email[0] === action.payload
      );
      state.inbox[readData][1] = { ...state.inbox[readData][1], read: true };
      state.unRead--;
    },
  },
});
export default emailSlice.reducer;

export const emailActions = emailSlice.actions;
