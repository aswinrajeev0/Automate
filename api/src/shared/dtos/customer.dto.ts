export interface CustomerDTO {
    clientId?: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }

  export interface CustomerLoginDTO {
    email: string,
    password: string
  }

  export interface AdminLoginDTO {
    email: string,
    password: string
  }