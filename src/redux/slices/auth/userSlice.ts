import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  forgotPassword,
  login,
  resendOtp,
  resetPassword,
  signup,
  triggerGetUserData,
  updateUserData,
  verifyOtp,
} from './userServices';
import {UserDataResponse} from './type';

interface UserState {
  userData: Record<string, string>;
  loading: boolean;
  error: boolean;
  errorCode?: number;
  message?: string;
  userEmail?: string | null;
  userFullName?: string | null;
  updateUserInformation?: Record<string, string>;
  retrieveUserInformation?: UserDataResponse;
  otpValidate?: Record<string, string>;
  passwordRequest?: Record<string, string>;
}

const initialState: UserState = {
  userData: {},
  loading: false,
  error: false,
  message: '',
  userEmail: null,
  userFullName: null,
  errorCode: 0,
  updateUserInformation: {},
  retrieveUserInformation: {},
  otpValidate: {},
  passwordRequest: {},
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setemail: (state, action: PayloadAction<string | null>) => {
      state.userEmail = action.payload;
    },
    setFullName: (state, action: PayloadAction<string | null>) => {
      state.userFullName = action.payload;
    },
    resetUserState: state => {
      state.errorCode = initialState.errorCode;
      state.error = initialState.error;
      state.message = initialState.message;
    },
    resetUserData: state => {
      state.userData = initialState.userData;
      state.error = initialState.error;
    },
    resetValidateOtp: state => {
      state.otpValidate = initialState.otpValidate;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload!.data as Record<string, string>;
      })
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.data.message;
        state.errorCode = action.payload.data.data.error_code;
      })

      //verify otp slice
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorCode = initialState.errorCode;
        state.otpValidate = action.payload.data as Record<string, string>;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
        state.errorCode = action.payload.error_code;
        state.otpValidate = action.payload;
      })

      //login
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload!.data as Record<string, string>;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
        state.errorCode = action.payload.data.data.error_code;
      })

      //forgot password
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorCode = initialState.errorCode;
        state.passwordRequest = action.payload.data as Record<string, string>;
      })

      .addCase(forgotPassword.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message;
        state.errorCode = action.payload?.error_code;
        state.passwordRequest = action.payload;
      })

      //reset password
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload!.data as any;
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.data.message;
      })

      //resend Otp
      .addCase(resendOtp.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userData = action.payload!.data as Record<string, string>;
      })
      .addCase(resendOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.data.message;
      })

      //GET USER DATA
      .addCase(triggerGetUserData.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(triggerGetUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.retrieveUserInformation = action.payload!
          .data as UserDataResponse;
      })
      .addCase(
        triggerGetUserData.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload.data.message;
        },
      )

      //update user information
      .addCase(updateUserData.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.updateUserInformation = action.payload!.data as Record<
          string,
          string
        >;
      })
      .addCase(updateUserData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.data.message;
      });
  },
});

export const {
  setemail,
  resetUserState,
  resetUserData,
  setFullName,
  resetValidateOtp,
} = userSlice.actions;
export default userSlice.reducer;
