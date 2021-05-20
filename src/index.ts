import fetch from "node-fetch";
import * as T from "./type";
import { toUrlEncoded } from "./utils";
import { secret, url as redirectUrl } from "./config";

const host = "https://api.stripe.com/v1";

const getHeaders = () => ({
  "content-type": "application/x-www-form-urlencoded",
  Authorization: "Bearer " + secret,
});

/**
 *
 * @param items
 * @returns
 * @see https://stripe.com/docs/api/checkout/sessions/create
 */
export const checkout = async (items: T.Item[]) => {
  const path = "/checkout/sessions";

  const session: T.Session = {
    customer_email: null,
    success_url: redirectUrl.success,
    cancel_url: redirectUrl.cancel,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items,
  };

  const options = {
    body: toUrlEncoded(session),
    method: "POST",
    headers: getHeaders(),
  };

  const r = await fetch(host + path, options);
  return r.json();
};
