import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CardModalType {
  id?: string;
  value: boolean;
}

const initialState: CardModalType = {
  value: false,
  id: undefined,
};

export const cardModalSlice = createSlice({
  name: "cardModal",
  initialState,
  reducers: {
    onOpen: (state, action: PayloadAction<string>) => {
      state.value = true;
      state.id = action.payload; // Set the id from the action payload
    },
    onClose: (state) => {
      state.value = false;
      state.id = undefined; // Clear the id when closing the modal
    },
  },
});

// Action creators are generated for each case reducer function
export const { onOpen, onClose } = cardModalSlice.actions;

export default cardModalSlice.reducer;
