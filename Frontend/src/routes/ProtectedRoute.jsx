import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import DashboardLayout from "./DashboardLayout";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null;
  return (
    <div className="container mx-auto my-24">
      {isSignedIn ? children : <Navigate to="/sign-in" />}
    </div>
  );
};

export default ProtectedRoute;
