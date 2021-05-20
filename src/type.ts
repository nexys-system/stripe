// official defintiion
// https://github.com/stripe/stripe-node/blob/master/types/2020-08-27/Checkout/Sessions.d.ts
export interface Item {
  price: string;
  quantity: number;
}
export interface Session {
  success_url: string;
  cancel_url: string;
  mode: "payment";
  payment_method_types: "card"[];
  line_items: Item[];
  /**
   * If provided, this value will be used when the Customer object is created.
   * If not provided, customers will be asked to enter their email address.
   * Use this parameter to prefill customer data if you already have an email
   * on file. To access information about the customer once the payment flow is
   * complete, use the `customer` attribute.
   */
  customer_email: string | null;
}
