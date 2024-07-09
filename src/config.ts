interface ApiUrls {
  signUp: string;
  otpVerification: string;
  logIn: string;
  forgotPassword:string;
  passwordReset:string
  resendOtp : string;
  productList:string;
  feesType:string;
  cartAdd:string;
  cartItemQuantity:string;
  listCart:string;
  getStates: string;
  deleteCartItem:string;

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
  feesType:`${BASE_URL}fees`, // PUT
  cartAdd:`${BASE_URL}cart/add`, //POST
  cartItemQuantity:`${BASE_URL}cart/item/quantity`, // PUT
  listCart:`${BASE_URL}cart`, // PUT
  getStates:`${BASE_URL}state`, // GET
  deleteCartItem :`${BASE_URL}cart/item` //DELETE
};

export const appUserType = "customer"