import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrentOrgState {
  org_id: string;
}

const initialState: CurrentOrgState = {
  org_id: "",
};

export const currentOrgSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    changeOrg: (state, action: PayloadAction<string>) => {
      state.org_id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeOrg } = currentOrgSlice.actions;

export default currentOrgSlice.reducer;
