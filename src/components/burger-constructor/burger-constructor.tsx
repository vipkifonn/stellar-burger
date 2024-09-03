import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderRequest, getUser, getOrderData } from '@selectors';
import { orderBurger } from '../../services/actions';
import {
  clearConstructor,
  clearOrder
} from '../../services/reducers/constructor-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector((state) => state.constructorSlice);
  const orderRequest = useSelector(getOrderRequest);
  const user = useSelector(getUser);

  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const { bun, ingredients } = constructorItems;

    if (!bun || ingredients.length === 0) {
      return;
    }

    const order: string[] = [
      bun._id,
      ...ingredients.map((ingredient: TIngredient) => ingredient._id),
      bun._id
    ];
    dispatch(orderBurger(order));
    dispatch(clearConstructor());
  };
  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
