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
  },
});

export const { setProducts } = actions;

export default reducer;
