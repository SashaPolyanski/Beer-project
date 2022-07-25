import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppStateType = {
  isLoading: boolean;
};
const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
  } as AppStateType,
  reducers: {
    setLoading(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoading = action.payload.value;
    },
  },
});

export const { setLoading } = appSlice.actions;
export const appReducer = appSlice.reducer;
