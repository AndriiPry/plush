import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/loginpage" />;
};

export default ProtectedRoute;
