import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store';
import Home from './pages/Home'
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import QuickPurchase from './pages/QuickPurchase';
import PaymentInfo from './pages/PaymentInfo';
import Gallery from './pages/Gallery';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

import AdminMain from './pages/Admin/AdminMain';

import './index.css'


const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/quick-purchase',
    element:<QuickPurchase/>
  },{
    path:'/payment-info',
    element:<PaymentInfo/>
  },
  {
    path:'/about-us',
    element:<About/>
  },
  {
    path:'/contact-us',
    element:<ContactUs/>
  },
  {
    path:'/cart',
    element:<Cart/>
  },
  {
    path:'/gallery',
    element:<Gallery/>
  },
  {
    path:'/checkout',
    element:<Checkout/>
  },
  {
    path:'/admin',
    element:<AdminMain/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
