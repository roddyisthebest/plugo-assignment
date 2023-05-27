import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ProductType from '../types/ProductType';
import ProductInCartType from '../types/ProductInCartType';
import State from '../types/State';
const { actions, reducer } = createSlice({
  name: 'default',
  initialState: {
    products: [] as ProductType[],
    productsInCart: [] as ProductInCartType[],
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
  },
});

export const { setProducts, addProduct, removeProduct, editProducts } = actions;

export default reducer;
