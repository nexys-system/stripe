// official defintiion
// https://github.com/stripe/stripe-node/blob/master/types/2020-08-27/Checkout/Sessions.d.ts
export interface LineItem {
  price: string;
  quantity: number;
}

export interface CheckoutSession {
  success_url: string;
  cancel_url: string;
  mode?: "payment";
  currency?: string;
  payment_method_types?: "card"[];
  line_items: LineItem[];
  /**
   * If provided, this value will be used when the Customer object is created.
   * If not provided, customers will be asked to enter their email address.
   * Use this parameter to prefill customer data if you already have an email
   * on file. To access information about the customer once the payment flow is
   * complete, use the `customer` attribute.
   */
  customer_email?: string;
}

export type Method = "GET" | "POST" | "DELETE";
