import { CheckoutSession, LineItem, Method } from "./type";
import { request as preRequest } from "./utils";

// dashboard: https://dashboard.stripe.com/developers
// API ref https://stripe.com/docs/api/authentication?lang=curl

class Client {
  request: (
    path: string,
    b?: {
      method: Method;
      data?: {
        [k: string]: any;
      };
    }
  ) => Promise<any>;

  constructor(secretKey: string) {
    this.request = preRequest(secretKey);
  }

  getBalance = async () => this.request("/balance");

  getProducts = async () => this.request("/products");
  getPrices = async () => this.request("/prices");

  addProduct = async (name: string) =>
    this.request("/products", { method: "POST", data: { name } });

  addPrice = async (
    unit_amount: number,
    currency: string,
    product: string // type = 'one_time'
  ) =>
    this.request("/prices", {
      method: "POST",
      data: {
        active: true,
        currency,
        unit_amount,
        product,
        //  type
      },
    });

  checkoutSessionCreate = ({
    cancel_url,
    success_url,
    currency = "CHF",
    line_items,
    mode = "payment",
  }: CheckoutSession): Promise<{
    id: string;
    object: "checkout.session";
    url: string;
  }> =>
    this.request("/checkout/sessions", {
      method: "POST",
      data: {
        cancel_url,
        success_url,
        currency,
        line_items,
        mode,
      },
    });

  createProductWPrice = async (
    label: string,
    rate: number,
    currency = "CHF"
  ): Promise<{
    product: { id: string }; // any many others not defined here
    price: { id: string }; // any many others not defined here
  }> => {
    const product = await this.addProduct(label);
    const price = await this.addPrice(
      Math.round(rate * 100),
      currency,
      product.id
    );

    return { product, price };
  };

  createProductsAndThenCheckout = async (
    products: {
      label: string;
      rate: number;
      quantity?: number;
      currency?: string;
    }[],
    { success_url, cancel_url }: { success_url: string; cancel_url: string }
  ) => {
    const createProductsResponse = products.map(({ label, rate, currency }) =>
      this.createProductWPrice(label, rate, currency)
    );

    const cp = await Promise.all(createProductsResponse);
    const line_items: LineItem[] = cp.map((p, i) => {
      const quantity: number = (products[i] && products[i].quantity) || 1;
      return {
        price: p.price.id,
        quantity,
      };
    });

    return this.checkoutSessionCreate({ success_url, cancel_url, line_items });
  };
}

export default Client;
