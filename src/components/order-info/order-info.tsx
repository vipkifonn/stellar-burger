import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../slises/price/activity';
import { useDispatch, useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderData = useSelector((state) => state.order.orderData);

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));
  }, []);
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo: TIngredientsWithCount = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          acc[item] = {
            ...ingredient,
            count: acc[item] ? acc[item].count + 1 : 1
          };
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
