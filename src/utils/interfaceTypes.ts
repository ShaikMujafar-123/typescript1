// Interface for Header.tsx

export interface Options {
  adult: number;
  children: number;
  room: number;
}

export interface HeaderProps {
  type: string;
}

export interface RangeState {
  startDate: Date;
  endDate: Date | null;
  key: string;
}

// Interfaces for Navbar.tsx
export interface User {
  email: string;
  username: string;
  password: string;
  mobileNumber: string;
  dateOfBirth: string;
  login_status: string;
  emailError?: string;
  usernameError?: string;
  passwordError?: string;
  mobileNumberError?: string;
}

export interface SearchItemProps {
  hotelName: string;
  hotelDesc: string;
  room: Room;
}

export interface Room {
  adults: number;
  childrens: number;
  roomName: string;
  features: string;
  price: number;
}
export interface Data {
  email: string;
  username: string;
  password: string;
  mobileNumber: string;
  dateOfBirth: string;
  login_status: string;
}

export interface BookingData {
  hotelName: string;
  rooms: Room;
  username: string;
}

export interface Hotel {
    hotelName: string;
    hotelDesc: string;
    location: string;
    roomsData: Room[];
  }
  export interface IPropertyTypes {
    propertyName: string;
    propertyImg: string;
    hotels: Hotel[];
  }
