import ProductInCartType from '../types/ProductInCartType';
import ProductType from '../types/ProductType';

const getLocalStorage = (key: string) => {
  if (localStorage.getItem(key) === null) {
    return null;
  }
  return JSON.parse(localStorage.getItem(key) as string);
};

const setLocalStorage = (
  key: string,
  value: ProductType[] | ProductInCartType
) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getLocalStorage, setLocalStorage };
