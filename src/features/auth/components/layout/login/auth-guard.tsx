import useToken from "@/features/auth/hooks/use-token";
import { Navigate } from "react-router";



export default function AuthGuard({children}: {children: React.ReactNode}) {
  
    const { hasValidToken } = useToken();
  if (!hasValidToken()) {
    return <Navigate to="/login" replace />;
  }
    return children;
  
}
