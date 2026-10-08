import useToken from "@/features/auth/hooks/use-token";
import { Navigate, Outlet } from "react-router";



export default function AuthGuard() {
  
  const { getToken } = useToken();
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }
    return <Outlet />;
  
}
