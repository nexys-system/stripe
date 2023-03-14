import qs from "qs";
import { Method } from "./type";

const baseUrl = "https://api.stripe.com/v1";

const makeBody = (data?: { [k: string]: any }) => {
  if (data === undefined || data === null) {
    return undefined;
  }

  return qs.stringify(data);
};

export const request =
  (secretKey: string) =>
  async (
    path: string,
    {
      method = "GET",
      data,
    }: { method?: Method; data?: { [k: string]: any } } = {}
  ) => {
    const url = baseUrl + path;
    const body = makeBody(data);

    const Authorization = "Bearer " + secretKey;
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
      Authorization,
    };
    const r = await fetch(url, { method, headers, body });
    return r.json();
  };
