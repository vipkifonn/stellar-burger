import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AuthRoute, UnAuthRoute } from '../../protected-route/protected-route';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkUserAuth, getIngredients } from '../../services/actions';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/login'
            element={<UnAuthRoute component={<Login />} />}
          />
          <Route
            path='/register'
            element={<UnAuthRoute component={<Register />} />}
          />
          <Route
            path='/forgot-password'
            element={<UnAuthRoute component={<ForgotPassword />} />}
          />
          <Route
            path='/reset-password'
            element={<UnAuthRoute component={<ResetPassword />} />}
          />
          <Route
            path='/profile'
            element={<AuthRoute component={<Profile />} />}
          />
          <Route
            path='/profile/orders'
            element={<AuthRoute component={<ProfileOrders />} />}
          />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Описание ингредиента'}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Информация по заказу'}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={'Информация по заказу'}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <AuthRoute component={<OrderInfo />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
