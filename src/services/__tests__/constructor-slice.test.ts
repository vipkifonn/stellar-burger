import { nanoid } from '@reduxjs/toolkit';
import {
  constructorState,
  addIngredient,
  moveIngredient,
  removeIngredient
} from '../reducers/constructor-slice';
import constructorSlice from '../reducers/constructor-slice';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn()
}));
const mockedNanoid = nanoid as jest.Mock;
mockedNanoid.mockReturnValue('dmmkw99vXUrTRTBKuqkjP');

describe('проверка редьюсеров constructor', () => {
  const getInitialState = (): constructorState => ({
    bun: null,
    ingredients: [],
    orderRequest: false,
    order: null
  });

  test('проверка добавления ингредиента', () => {
    const initialState = getInitialState();
    const newState = constructorSlice(
      initialState,
      addIngredient({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual([
      {
        id: 'dmmkw99vXUrTRTBKuqkjP',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]);
  });

  test('проверка изменения порядка ингредиентов в начинке', () => {
    const initialState = getInitialState();
    initialState.ingredients.push(
      ...[
        {
          id: 'dmmkw99vXUrTRTBKuqkjP',
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        },
        {
          id: 'ziskw99vXUrTRTBKuqkjP',
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png'
        }
      ]
    );
    const newState = constructorSlice(
      initialState,
      moveIngredient({ index: 0, newIndex: 1 })
    );
    const { ingredients } = newState;
    expect(ingredients).toEqual([
      {
        id: 'ziskw99vXUrTRTBKuqkjP',
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      },
      {
        id: 'dmmkw99vXUrTRTBKuqkjP',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ]);
  });

  test('проверка удаления ингредиента', () => {
    const initialState = getInitialState();
    initialState.ingredients.push({
      id: 'dmmkw99vXUrTRTBKuqkjP',
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    });

    const newState = constructorSlice(
      initialState,
      removeIngredient('dmmkw99vXUrTRTBKuqkjP')
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual([]);
  });
});
