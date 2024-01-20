import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { forgotPassword, login, signup, verifyOtp } from './userServices';


interface UserState {
  userData: Record<string, string>;
  loading: boolean;
  error: boolean;
  errorCode?: number;
  message?:string
  userEmail?:string | null
}

const initialState: UserState = {
  userData: {},
  loading: false,
  error: false  ,
  message:"",
  userEmail:null,
  errorCode: 0, 
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setemail : (state, action:PayloadAction<string | null>)=>{
      state.userEmail=action.payload
    },
    resetUserState :(state)=>{
      state.errorCode = initialState.errorCode, 
      state.error = initialState.error
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state,action) => {

        state.loading = true;
        state.error = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload!.data as Record<string, string>;
      })  
      .addCase(signup.rejected, (state, action: PayloadAction<any> ) => {
        state.loading = false;
        state.error = true;
        state.errorCode = (action.payload?.data?.error_code || "unknown");
      })

      //verify otp slice
      .addCase(verifyOtp.pending, state =>{
        state.loading = true;
        state.error = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload!.data as Record<string, string>;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<any> ) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.data.message
      })

      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload!.data as Record<string, string>;
      })  
      .addCase(login.rejected, (state, action: PayloadAction<any> ) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.data.message
        state.errorCode = (action.payload?.data?.error_code || "unknown")
      })

      //forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload!.data as Record<string, string>;
      })  
      .addCase(forgotPassword.rejected, (state, action: PayloadAction<any> ) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.data.message
      })
  },
});


export const { setemail, resetUserState } = userSlice.actions;

export default userSlice.reducer;