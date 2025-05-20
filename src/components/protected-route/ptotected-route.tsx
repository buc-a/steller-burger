import { useSelector} from '../../services/store';
import { getUserStateSelector} from '../../slices/userSlice';
import { Navigate } from 'react-router-dom';
type ProtectedRouteProps = {
  children: React.ReactElement;
  forAuthorizedUser: boolean
};

export const ProtectedRoute = ({ children, forAuthorizedUser }: ProtectedRouteProps) => {
  const isAuthorized = useSelector(getUserStateSelector).isAuthorized;

  if (isAuthorized && !forAuthorizedUser){
    return <Navigate to="/profile" replace />;
  }
  if (forAuthorizedUser && !isAuthorized){
    return <Navigate to="/login" replace />;
  }
  
  return children;
  

}