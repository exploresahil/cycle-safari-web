export type ADMIN_TYPE = {
  id: number;
  name: string;
  email: string;
  phone_code: string;
  phone: number;
  created_at: string;
  updated_at: string;
};

export type USER_TYPE = {
  id: number;
  name: string;
  email: string;
  phone_code: string;
  phone: number;
  aadhar_number: string;
  pan_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  created_at: string;
  updated_at: string;
};
