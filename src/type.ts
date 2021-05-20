// official defintiion
// https://github.com/stripe/stripe-node/blob/master/types/2020-08-27/Checkout/Sessions.d.ts
export interface Item {
  price: string;
  quantity: number;
}
export interface Session {
  success_url: string;
  cancel_url: string;
  mode: 'payment';
  payment_method_types: 'card'[];
  line_items: Item[];
}
