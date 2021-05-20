// to bne configured in
// https://dashboard.stripe.com/test/developers
export const key = process.env.STRIPE_PK || "pl";
export const secret = process.env.STRIPE_SECRET || "my_secret";

const host = process.env.HOST || "http://localhost:3000";

export const url = {
  success: host + (process.env.STRIPE_URL_SUCCESS || "/checkout/success"),
  cancel: host + (process.env.STRIPE_URL_SUCCESS || "/checkout/cancel"),
};
