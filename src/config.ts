interface ApiUrls {
  signUp: string;
  otpVerification: string;
  logIn: string;
  forgotPassword:string;
  passwordReset:string
  resendOtp : string;
  cart:string;
  productList:string;
  feesType:string;
}

const BASE_URL = 'https://leetabackend-e6d948d15ae2.herokuapp.com/api/';

export const apiUrl: ApiUrls = {
  signUp: `${BASE_URL}session/signup`, // POST
  otpVerification: `${BASE_URL}session/otp/validate`, // POST
  logIn: `${BASE_URL}session/signin`, // POST
  forgotPassword: `${BASE_URL}session/forgot_password`, // POST
  passwordReset: `${BASE_URL}session/create_new_password`, // POST
  resendOtp: `${BASE_URL}session/otp/request`, //POST
  cart:`${BASE_URL}cart/add`, // POST
  productList:`${BASE_URL}product/list`, // POST
  feesType:`${BASE_URL}fees/type` // POST
};

export const appUserType = "customer"