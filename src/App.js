import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Orders from './Components/Orders/Orders';
import Address from './Components/Address/Address';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import AuthContextProvider from './Contexts/authContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProtectAuthRoute from './Components/ProtectedRoute/ProtectAuthRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { Offline, Online } from 'react-detect-offline';
import Navbar from './Components/Navbar/Navbar';


function App() {

  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '', element: <Navigate to={'home'} /> },
        { path: 'login', element: <ProtectAuthRoute> <Login /> </ProtectAuthRoute> },
        { path: 'register', element: <ProtectAuthRoute> <Register /> </ProtectAuthRoute> },
        { path: 'home', element: <ProtectedRoute> <Home /> </ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute> <Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute> <Orders /></ProtectedRoute> },
        { path: 'address/:cartId', element: <ProtectedRoute> <Address /> </ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute>  <Cart /> </ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
        { path: 'product/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ])

  return <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthContextProvider>
        <ReactQueryDevtools position='bottom-right' />
      </QueryClientProvider>
      <ToastContainer />
    </Provider>



  </>
}

export default App;
