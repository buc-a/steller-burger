import { ConstructorPage } from '@pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../pages/login/login';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { Register } from '../../pages/register/register';
import { Profile } from '../../pages/profile/profile';
import { Feed } from '../../pages/feed/feed';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders';
import { NotFound404 } from '../../pages/not-fount-404/not-fount-404';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info/order-info';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { AppHeader } from '@components';
import { ProtectedRoute } from '../../components/protected-route/ptotected-route';
import { useDispatch} from '../../services/store';
import { getIngredientsThunk} from '../../slices/ingredientSlice';
import { getUserThunk } from '../../slices/userSlice';
import { getFeedsThunk} from '../../slices/feedsSlice'
import store from '../../services/store';
import { Provider } from 'react-redux';

import { useEffect } from 'react';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getUserThunk());
  }, [])
  return (
        

        <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={<ProtectedRoute forAuthorizedUser={false}><Login /></ProtectedRoute>}/>
          <Route
            path='/register'
            element={<ProtectedRoute forAuthorizedUser={false}><Register /></ProtectedRoute>}/>
          <Route
            path='/forgot-password'
            element={<ProtectedRoute forAuthorizedUser={false}><ForgotPassword /></ProtectedRoute>}/>   
          <Route
            path='/reset-password'
            element={<ProtectedRoute forAuthorizedUser={false}><ResetPassword /></ProtectedRoute>}/>   
          <Route
            path='/profile'
            element={<ProtectedRoute forAuthorizedUser={true}><Profile /></ProtectedRoute>}/>  
          <Route
            path='/profile/orders'
            element={<ProtectedRoute forAuthorizedUser={true}><ProfileOrders /></ProtectedRoute>}/>   
          <Route path='*' element={<NotFound404 />} />
          <Route 
            path='/feed/:number'
            element={
              <Modal title={''} onClose={() => {navigate(-1)}}>
                <OrderInfo />
              </Modal>} />
          <Route 
            path='/ingredients/:id'
            element={
              <Modal title={''} onClose={() => {navigate(-1)}}>
                <IngredientDetails />
              </Modal>} />
          <Route 
            path='/profile/orders/:number'
            element={
              <ProtectedRoute forAuthorizedUser={true}>
                <Modal title={''} onClose={() => {navigate(-1)}}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>} />      
        </Routes>
        </div>

)}

export default App;
