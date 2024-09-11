interface Location {
    latitude: number;
    longitude: number;
  }
  
  interface Coordinate {
    latitude: number;
    longitude: number;
  }
  
  interface Address {
    state: string;
    city: string;
    lga: string;
    full_address: string;
    coordinate: Coordinate;
    verified: boolean;
  }
  
  interface GuestDataResponse {
    data: {
      id: string;
      location: Location;
      device_id: string;
      first_name: string;
      last_name: string;
      number: string;
      email: string;
      address: Address;
    };
  }
  