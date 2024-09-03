import { Children, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import Create from "./pages/Create/Create";
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import MyAccount from "./pages/MyAccount/MyAccount"
import "./app.scss"
import SignUpController from "./pages/SignUp/SignUpController";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import LoginPageController from "./pages/LoginPage/LoginPageController";
import OTPVerifyier from "./pages/PasswordReset/OTPVerifyier";
import PasswordResetController from "./pages/PasswordReset/PasswordResetController";
import CreatePasswordController from "./pages/PasswordReset/CreatePasswordController";
import ProtectedRoute from "./ProtectedRoute"; 
import OrderPageController from "./pages/Order/OrderPageController";
import MyAccountController from "./pages/MyAccount/MyAccountController";


const Layout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {snackBar} = useSelector(state => state);
  useEffect(() => {
    if (snackBar.message) {      
      enqueueSnackbar(snackBar.message, { variant: snackBar.variant })
    }
  }, [snackBar.id])
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/loginpage",
        element: <LoginPageController />,
      },
      {
        path: "/signup",
        element: <SignUpController />,
      },
      {
        path: "/passwordreset",
        element: <PasswordResetController />,
      },
      {
        path: "/myaccount",
        element: <ProtectedRoute element={<MyAccountController />}/>,
      },
      {
        path:"/verifyOTP",
        element : <OTPVerifyier />
      },
      {
        path:"/createPassword",
        element : <CreatePasswordController />
      },
      {
        path:"/orderPage",
        element :  <ProtectedRoute element={<OrderPageController />}  />
      },
      
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}


export default App;

