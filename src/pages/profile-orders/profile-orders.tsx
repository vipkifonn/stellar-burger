import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrdersUser } from '@selectors';
import { useDispatch, useSelector } from '../../services/store';
import { ordersUser } from '../../services/actions';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersUser());
  }, []);

  const orders: TOrder[] = useSelector(getOrdersUser);

  return <ProfileOrdersUI orders={orders} />;
};
