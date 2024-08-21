interface Coordinate {
    latitude: number;
    longitude: number;
  }
  
  interface Address {
    state: string;
    city?: string;
    lga: string;
    full_address: string;
    closest_landmark?: string;
    coordinate: Coordinate;
    verified: boolean;
    default_delivery_address: boolean;
    address_type: string;
  }
  
  interface Email {
    address: string;
    verified: boolean;
  }
  
  interface Phone {
    primary: boolean;
    number: string;
    verified: boolean;
  }
  
  interface UserData {
    id: string;
    first_name: string;
    last_name: string;
    email: Email;
    addresses: Address[];
    phone: Phone;
    dob: string;
    has_pin: boolean;
    pin_blocked: boolean;
    is_blocked: boolean;
    is_blocked_reason: string;
    status: string;
    status_ts: number;
    ts: number;
  }
  export interface UserDataResponse {
    data?: UserData;
  }