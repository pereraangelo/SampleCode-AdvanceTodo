import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
