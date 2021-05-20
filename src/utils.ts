import * as T from './type';

export const toUrlEncoded = (session: T.Session): string =>
  Object.entries(session)
    .map(([k, v]) => {
      if (typeof v === 'string') {
        return k + '=' + encodeURIComponent(v);
      }

      if (Array.isArray(v)) {
        return v
          .map((x, i) => {
            if (typeof x === 'string' || typeof x === 'number') {
              return `${k}[${i}]=${encodeURIComponent(x)}`;
            }

            return Object.entries(x)
              .map(([k2, v]) => `${k}[${i}][${k2}]=` + encodeURIComponent(String(v)))
              .join('&');
          })
          .join('&');
      }

      return '';
    })
    .join('&');
