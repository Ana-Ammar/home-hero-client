import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const PrivateProvider = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" state={location.pathname}></Navigate>;
  }
};

export default PrivateProvider;
