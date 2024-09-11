import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { updateGuestData } from './guestServices';
interface GuestState {
    loading: boolean;
    error: boolean;
    errorCode?: number;
    message?: string;
    guestData: any
  }

const initialState: GuestState = {
    loading: false,
    error: false,
    errorCode: 0,
    message: '',
    guestData: {}
  };
  export const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
      builder
      .addCase(updateGuestData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateGuestData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.guestData = action.payload!.data as Record<string, string>;
        console.log("Guest data",state.guestData)
      })
      .addCase(updateGuestData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.errorCode = action.payload?.data?.error_code || 1;
        state.message = action.payload.data.message;
      })
    },
  });


  export default guestSlice.reducer;