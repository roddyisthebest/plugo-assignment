import ProductType from './ProductType';

interface ProductInCartType extends ProductType {
  amount: number;
  check: boolean;
  productInCartIdx: number;
}

export default ProductInCartType;
