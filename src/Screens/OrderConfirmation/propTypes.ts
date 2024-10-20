import {CartItemResponsePayload} from '../../redux/slices/cart/types';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

export interface IProps {
  navigation: NavigationProp<ParamListBase>;
  deliveryCost?: number | null;
  fullName?: string | null;
  state?: string | null;
  address?: string | null;
  phone?: string | null;
  isExistingGuest?: boolean | null;
  isUserData?: boolean | null;
}
export interface UserDataType {
  fullName?: string | null;
  address?: string | null;
  state?: string | null;
  phone?: string | null;
  email?: string | null;
  lga?: string | null;
}

export interface Order {
  cartList: CartItemResponsePayload;
  sumAllOrders: () => string;
  serviceFeePerOrder: number;
  deliveryFeePerOrder: number;
}
export interface Payment {
  pyamentMethod?: boolean;
  onPress?: () => void;
}
