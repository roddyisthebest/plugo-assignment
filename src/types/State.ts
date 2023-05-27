import ProductInCartType from './ProductInCartType';
import ProductType from './ProductType';

interface State {
  products: ProductType[];
  productsInCart: ProductInCartType[];
  totalPrice: number;
}

export default State;
