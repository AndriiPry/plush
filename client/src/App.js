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
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import LoginPageController from "./pages/LoginPage/LoginPageController";

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
        element: <PasswordReset />,
      },
      {
        path: "/myaccount",
        element: <MyAccount />,
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
