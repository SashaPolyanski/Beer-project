import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppStateType = {
  isLoading: boolean;
  error: string;
};
const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false,
    error: '',
  } as AppStateType,
  reducers: {
    setLoading(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoading = action.payload.value;
    },
    setError(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error;
    },
  },
});

export const { setLoading, setError } = appSlice.actions;
export const appReducer = appSlice.reducer;
