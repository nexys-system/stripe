// to bne configured in
// https://dashboard.stripe.com/test/developers
export const key = process.env.STRIPE_PK || "pl";
export const secret = process.env.STRIPE_SECRET || "my_secret";

const host = "http://localhost:3000";

export const url = {
  success: host + "/checkout/success",
  cancel: host + "/checkout/cancel",
};
