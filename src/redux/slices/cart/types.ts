interface FilterField {
  name: string;
  operator: string;
  value: string;
}

interface Filter {
  operator: string;
  fields: FilterField[];
}

interface Paging {
  index: number;
  size: number;
  total: number;
}

interface Metadata {
  filter: Filter;
  paging: Paging;
}

interface DataItem {
  id: string;
  parent_category: string;
  name: string;
  description: string;
  status: string;
  status_ts: number;
  ts: number;
}

export interface ProductListResponse {
  data?: {
    metadata: Metadata;
    data: DataItem[];
  };
}

//FEE Response
interface Cost {
    cost_per_kg: number;
    cost_per_qty: number;
    cost_per_type: number;
}

interface Lga {
    state: string;
    lga: string;
}

interface DataItem {
    id: string;
    product_id: string;
    fee_type: string;
    lga: Lga;
    cost: Cost;
    status: string;
    status_ts: number;
    ts: number;
}

interface Paging {
    index: number;
    size: number;
    total: number;
}

interface Metadata {
    paging: Paging;
}

export interface ProductFeeResponse {
    data?: {
        metadata: Metadata;
        data: DataItem[];
    };
}

interface CartItem {
  id: string;
  product_id: string;
  product_category: string;
  vendor_id: string;
  weight: number;
  quantity: number;
  cost: number;
}

interface ResultData {
  id: string;
  customer_id: string;
  cart_items: CartItem[];
  total: number;
  status: string;
  status_ts: number;
  ts: number;
}

export interface CartItemResponsePayload {
  data?: ResultData;
}

interface FeeItem {
  id: string;
  product_id: string;
  fee_type: string;
  lga: {
      state: string;
      lga: string;
  };
  cost: {
      cost_per_kg: number;
      cost_per_qty: number;
      cost_per_type: number;
  };
  status: string;
  status_ts: number;
  ts: number;
}
interface Metadata {
  filter: {
      operator: string;
      fields: {
          name: string;
          operator: string;
          value: string;
      }[];
  };
  paging: {
      index: number;
      size: number;
      total: number;
  };
}

export interface FeesResponse {
  data?: FeeItem[];
  metadata?: Metadata;
}

//state reponse type
interface State {
  id: string;
  name: string;
  region: string;
  capital: string;
  lgas: string[];
  slogan: string;
  towns: string[];
  status_ts: number;
  ts: number;
}

export interface StateResponse {
  data?: State[];
}