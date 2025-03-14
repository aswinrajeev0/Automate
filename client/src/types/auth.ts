
export interface CustomerSignupFormValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export interface CustomerRegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface CustomerLoginFormValues {
  email: string,
  password: string
}

export interface CustomerLoginData {
  email: string,
  password: string
}

export interface AdminLoginFormValues {
  email: string,
  password: string
}

export interface AdminLoginData {
  email: string,
  password: string
}

export interface WorkshopSignupFormValues {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  country: string,
  state: string,
  city: string,
  steetAddress: string,
  buildingNo: string
}

export interface WorkshopRegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  country: string,
  state: string,
  city: string,
  steetAddress: string,
  buildingNo: string
}

export interface WorkshopLoginFormValues {
  email: string,
  password: string
}

export interface WorkshopLoginData {
  email: string,
  password: string
}
