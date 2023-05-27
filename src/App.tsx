import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts, setProductsInCart } from './store/reducer';

function App() {
  const dispatch = useDispatch();

  async function getProducts() {
    const response = fetch('/products');
    return response.then((res) => res.json());
  }

  async function getProductsInCart() {
    const response = fetch('/productsInCart');
    return response.then((res) => res.json());
  }

  const exec = useCallback(async () => {
    try {
      const products = await getProducts();
      dispatch(setProducts(products));
      const productsInCart = await getProductsInCart();
      dispatch(setProductsInCart(productsInCart));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  useEffect(() => {
    exec();
  }, [exec]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
