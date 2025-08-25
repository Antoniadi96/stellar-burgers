import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import { ProtectedRoute } from '@components/protected-route/protected-route';

// Страницы
import { ConstructorPage } from '@pages/constructor-page';
import { Feed } from '@pages/feed/feed';
import { Login } from '@pages/login/login';
import { Register } from '@pages/register/register';
import { ForgotPassword } from '@pages/forgot-password/forgot-password';
import { ResetPassword } from '@pages/reset-password/reset-password';
import { Profile } from '@pages/profile/profile';
import { ProfileOrders } from '@pages/profile-orders/profile-orders';
import { NotFound404 } from '@pages/not-fount-404';

// Компоненты
import { Modal } from '@components/modal/modal';
import { OrderInfo } from '@components/order-info/order-info';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { useAppDispatch } from '@/services/store';
import { fetchIngredients } from '@/services/slices/ingredients';
import { refreshUser } from '@/services/slices/userSlice';

const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const navigate = useNavigate();
  const handleClose = () => navigate(-1);

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {/* основные страницы */}
        <Route index element={<ConstructorPage />} />
        <Route path='feed' element={<Feed />} />
        <Route
          path='login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />

        {/* модальные окна */}
        <Route
          path='feed/:number'
          element={
            <Modal title='Информация о заказе' onClose={handleClose}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={handleClose}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal title='Информация о заказе' onClose={handleClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
