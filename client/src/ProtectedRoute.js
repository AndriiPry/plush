import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.user.isLoggedIn);
  return isAuthenticated ? element : <Navigate to="/loginpage" />;
};

export default ProtectedRoute;
