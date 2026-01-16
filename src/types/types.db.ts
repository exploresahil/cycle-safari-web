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

export type AUTH0_USER_TYPE = {
  created_at: string;
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
};
