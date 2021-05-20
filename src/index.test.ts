import * as I from './index';

test('checkout', async () => {
  const price = 13;
  const quantity = 2;

  const items = [{ price: 'price_1ItIQIECjzaGAkD8kuur0qFS', quantity }];

  const r = await I.checkout(items);
  console.log(r);
  expect(r.amount_total).toEqual(price * quantity * 100);
});
