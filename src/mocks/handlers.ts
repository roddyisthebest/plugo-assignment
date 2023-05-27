import { rest } from 'msw';
import { getLocalStorage, setLocalStorage } from './util';
import ProductType from '../types/ProductType';
import ProductInCartType from '../types/ProductInCartType';

let products: ProductType[] = [];
let productsInCart: ProductInCartType[] = [];

let productsAtLS = getLocalStorage('products');
let productsInCartAtLS = getLocalStorage('productsInCart');

if (productsAtLS === null) {
  for (let i = 0; i < 10; i++) {
    const product = {
      productIdx: i,
      name: `default product ${i}`,
      price: 25000,
      sale: 9 - i,
      type: 'default',
      introduction: 'it is a default clothes',
    };
    products.push(product);
  }

  setLocalStorage('products', products);
} else {
  products = productsAtLS;
}

if (productsInCartAtLS !== null) {
  productsInCart = productsInCartAtLS;
}

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),

  rest.get<{}, { productIdx: string }>(
    '/products/:productIdx',
    (req, res, ctx) => {
      const { productIdx } = req.params;

      console.log(productIdx);
      let product = products.find(
        (product) => product.productIdx === parseInt(productIdx, 10)
      );
      return res(ctx.status(200), ctx.json(product));
    }
  ),

  rest.patch<string>('/products', (req, res, ctx) => {
    const payload = JSON.parse(req.body);

    const index = products.findIndex(
      (product) => product.productIdx === payload.product.productIdx
    );
    products.splice(index, 1, payload.product);
    setLocalStorage('products', products);

    return res(ctx.status(200));
  }),

  rest.post<string>('/products', (req, res, ctx) => {
    console.log(req.body);
    const { name, price, sale, type, introduction } = JSON.parse(req.body);
    let product = {
      productIdx:
        products.length === 0
          ? 0
          : products[products.length - 1].productIdx + 1,
      name,
      price,
      sale,
      type,
      introduction,
    };

    let productsAtLS = getLocalStorage('products');
    productsAtLS.push(product);
    setLocalStorage('products', productsAtLS);
    products = productsAtLS;
    return res(ctx.status(201), ctx.json(product));
  }),

  rest.delete<{}, { productIdx: string }>(
    '/products/:productIdx',
    (req, res, ctx) => {
      const { productIdx } = req.params;
      let productsAtLS: ProductType[] = getLocalStorage('products');
      productsAtLS = productsAtLS.filter(
        (product) => product.productIdx !== parseInt(productIdx, 10)
      );
      setLocalStorage('products', productsAtLS);
      products = productsAtLS;
      return res(ctx.status(200));
    }
  ),

  rest.get('/productsInCart', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsInCart));
  }),

  rest.post<string>('/productsInCart', (req, res, ctx) => {
    const { product } = JSON.parse(req.body);
    let productInCart = {
      ...product,
      productInCartIdx:
        productsInCart.length !== 0
          ? productsInCart[productsInCart.length - 1].productInCartIdx + 1
          : 0,
      check: true,
      price: product.price - product.price * 0.01 * product.sale,
    };
    productsInCart.push(productInCart);
    setLocalStorage('productsInCart', productsInCart);

    return res(ctx.status(200), ctx.json(productInCart));
  }),
  rest.patch<{ index: number; product: ProductInCartType }>(
    '/productsInCart',
    (req, res, ctx) => {
      const { index, product } = req.body;
      productsInCart.splice(index, 1, product);
      setLocalStorage('productsInCart', productsInCart);
      return res(ctx.status(200));
    }
  ),
  rest.delete<{}, { productIdx: string }>(
    '/productsInCart/:productIdx',
    (req, res, ctx) => {
      const { productIdx } = req.params;
      productsInCart = productsInCart.filter(
        (product) => product.productIdx !== parseInt(productIdx, 10)
      );
      setLocalStorage('productsInCart', productsInCart);

      return res(ctx.status(200));
    }
  ),
];
