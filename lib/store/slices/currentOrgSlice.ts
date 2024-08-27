import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CurrentOrgState {
  orgId: string;
}

const initialState: CurrentOrgState = {
  orgId: "",
};

export const currentOrgSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    changeOrg: (state, action: PayloadAction<string>) => {
      state.orgId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeOrg } = currentOrgSlice.actions;

export default currentOrgSlice.reducer;
