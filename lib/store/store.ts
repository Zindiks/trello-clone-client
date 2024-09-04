import { configureStore } from "@reduxjs/toolkit";
import mobileSidebarReducer from "./slices/mobileSidebarSlice";
import currentOrgReducer from "./slices/currentOrgSlice";
import cardModelSlice from "./slices/cardModelSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      mobileSidebar: mobileSidebarReducer,
      organization: currentOrgReducer,
      cardModal: cardModelSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
