import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ProductType from '../types/ProductType';
import ProductInCartType from '../types/ProductInCartType';
import State from '../types/State';
const { actions, reducer } = createSlice({
  name: 'default',
  initialState: {
    products: [] as ProductType[],
    productsInCart: [] as ProductInCartType[],
    totalPrice: 0,
  } as State,
  reducers: {
    setProducts(state, { payload }: PayloadAction<ProductType[]>) {
      return { ...state, products: payload };
    },
    addProduct(state, { payload }: PayloadAction<ProductType>) {
      return { ...state, products: [...state.products, payload] };
    },
    removeProduct(state, { payload }: PayloadAction<number>) {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productIdx !== payload
        ),
      };
    },
    editProducts(state, { payload }: PayloadAction<ProductType>) {
      const products = [...state.products];
      const index = products.findIndex(
        (product) => product.productIdx === payload.productIdx
      );

      products.splice(index, 1, payload);

      return { ...state, products };
    },
    addProductInCart(state, { payload }: PayloadAction<ProductInCartType>) {
      return { ...state, productsInCart: [...state.productsInCart, payload] };
    },
    setProductsInCart(state, { payload }: PayloadAction<ProductInCartType[]>) {
      let totalPrice = 0;
      payload.map((productInCart) => (totalPrice += productInCart.price));

      return { ...state, productsInCart: payload, totalPrice };
    },
    editProductsInCart(
      state,
      {
        payload,
      }: PayloadAction<{
        productInCartIdx: number;
        key: string;
        value: number | boolean;
      }>
    ) {
      const productsInCart = [...state.productsInCart];

      const index = productsInCart.findIndex(
        (productsInCart) =>
          productsInCart.productInCartIdx === payload.productInCartIdx
      );

      productsInCart.splice(index, 1, {
        ...productsInCart[index],
        price: productsInCart[index].price,
        [payload.key]: payload.value,
      });

      let totalPrice = 0;
      let checkedProductsInCart = productsInCart.filter(
        (productInCart) => productInCart.check
      );

      for (let i = 0; i < checkedProductsInCart.length; i++) {
        totalPrice +=
          checkedProductsInCart[i].price * checkedProductsInCart[i].amount;
      }

      return { ...state, productsInCart, totalPrice };
    },
  },
});

export const {
  setProducts,
  addProduct,
  removeProduct,
  editProducts,
  addProductInCart,
  setProductsInCart,
  editProductsInCart,
} = actions;

export default reducer;
