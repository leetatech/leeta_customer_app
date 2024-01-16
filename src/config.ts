interface ApiUrls {
  signUp: string;
  otpVerification: string;
  logIn: string;
  forgotPassword:string;

}

// const BASE_URL = 'https://leetabackend-e6d948d15ae2.herokuapp.com/api/';
const BASE_URL = 'https://staging-leet-113-custom-gffdo6.herokuapp.com/api/';

export const apiUrl: ApiUrls = {
  signUp: `${BASE_URL}session/signup`, // POST
  otpVerification: `${BASE_URL}session/otp/validate`, // POST
  logIn: `${BASE_URL}session/signin`, // POST
  forgotPassword: `${BASE_URL}session/forgot_password` // POST
};

export const appUserType = "buyer"