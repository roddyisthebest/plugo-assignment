import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import Cart from './Cart';
import Detail from './Detail';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/product/:productIdx',
    Component: Detail,
  },
  {
    path: '/cart',
    Component: Cart,
  },
  {
    path: '/admin',
    Component: Admin,
  },
]);

export default router;
