interface ApiUrls {
  signUp: string;
  otpVerification: string;
  logIn: string;
  forgotPassword:string;
  passwordReset:string
  resendOtp : string;
  productList:string;
  feesType:string;
}

const BASE_URL = 'https://leetabackend-e6d948d15ae2.herokuapp.com/api/';

export const apiUrl: ApiUrls = {
  signUp: `${BASE_URL}session/signup`, // POST
  otpVerification: `${BASE_URL}session/otp/validate`, // POST
  logIn: `${BASE_URL}session/signin`, // POST
  forgotPassword: `${BASE_URL}session/password/forgot`, // POST
  passwordReset: `${BASE_URL}session/password/create`, // POST
  resendOtp: `${BASE_URL}session/otp/request`, //POST
  productList:`${BASE_URL}product`, // PUT
  feesType:`${BASE_URL}fees` // PUT
};

export const appUserType = "customer"