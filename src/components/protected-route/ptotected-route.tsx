import { useSelector} from '../../services/store';
import { isAuthorizedSelector} from '../../slices/userSlice';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
type ProtectedRouteProps = {
  children: React.ReactElement;
  forAuthorizedUser: boolean
};

export const ProtectedRoute = ({ children, forAuthorizedUser }: ProtectedRouteProps) => {
  const isAuthorized = useSelector(isAuthorizedSelector);
  const location = useLocation();
  const from = location.state?.from || '/';
  if (isAuthorized && !forAuthorizedUser){
    return <Navigate to={from} />;
  }
  if (forAuthorizedUser && !isAuthorized){
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;

}