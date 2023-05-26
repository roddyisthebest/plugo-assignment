import { createSlice } from '@reduxjs/toolkit';
import ProductType from '../types/ProductType';
import ProductInCartType from '../types/ProductInCartType';

const { actions, reducer } = createSlice({
  name: 'default',
  initialState: {
    products: [] as ProductType[],
    productsInCart: [] as ProductInCartType[],
  },
  reducers: {},
});

export default reducer;
