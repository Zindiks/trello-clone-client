import { createSlice } from "@reduxjs/toolkit"

export interface MobileSideBarType {
  value: boolean
}

const initialState: MobileSideBarType = {
  value: false,
}

export const mobileSidebarSlice = createSlice({
  name: "mobileSidebar",
  initialState,
  reducers: {
    onOpen: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    onClose: (state) => {
      state.value = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { onOpen, onClose } = mobileSidebarSlice.actions

export default mobileSidebarSlice.reducer
