import { ConstructorPage } from '@pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

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



const App = () => (
  <BrowserRouter>
    <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/login'
        element={<ProtectedRoute><Login /></ProtectedRoute>}/>
      <Route
        path='/register'
        element={<ProtectedRoute><Register /></ProtectedRoute>}/>
      <Route
        path='/forgot-password'
        element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>}/>   
      <Route
        path='/reset-password'
        element={<ProtectedRoute><ResetPassword /></ProtectedRoute>}/>   
      <Route
        path='/profile'
        element={<ProtectedRoute><Profile /></ProtectedRoute>}/>  
      <Route
        path='/profile/orders'
        element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>}/>   
      <Route path='*' element={<NotFound404 />} />
      <Route 
        path='/feed/:number'
        element={
          <Modal title={''} onClose={() => {}}>
            <OrderInfo />
          </Modal>} />
      <Route 
        path='/ingredients/:id'
        element={
          <Modal title={''} onClose={() => {}}>
            <IngredientDetails />
          </Modal>} />
      <Route 
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <Modal title={''} onClose={() => {}}>
              <IngredientDetails />
            </Modal>
          </ProtectedRoute>} />      
    </Routes>
    </div>
  </BrowserRouter>
);

export default App;
