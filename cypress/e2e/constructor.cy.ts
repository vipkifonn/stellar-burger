import Cypress from 'cypress';
const URL_API = 'https://norma.nomoreparties.space/api';
const ID_MAIN = '643d69a5c3f7b9001cfa093e';
const ID_BUN = '643d69a5c3f7b9001cfa093d';
const MAIN_SELECTOR = `[data-cy=${ID_MAIN}]`;
const BUN_SELECTOR = `[data-cy=${ID_BUN}]`;

const ADD_BUTTON_SELECTOR = 'button';
const MODALS_SELECTOR = '#modals';
const ORDER_BUTTON_TEXT = 'Оформить заказ';
const ORDER_NUMBER_SELECTOR = 'h2';
const BURGER_CONTAINER_SELECTOR = '[data-cy=burger-container]';
const COUNTER_NUM_SELECTOR = '.counter__num';
const ADD_TEXT = 'Добавить';

beforeEach(() => {
  cy.intercept('GET', `${URL_API}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('POST', `${URL_API}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${URL_API}/auth/user`, { fixture: 'user.json' });
  cy.intercept('POST', `${URL_API}/orders`, {
    fixture: 'order-burger.json'
  });

  cy.window().then((window) => {
    window.localStorage.setItem('refreshToken', 'refresh-test-token');
  });
  cy.setCookie('accessToken', 'access-test-token');
  cy.visit('/');

});

afterEach(() =>{
  cy.window().then((window) => {
    window.localStorage.clear();
  });
  cy.clearAllCookies();
})

describe('Тестирование работы ингредиентов', () => {
  it('Добавление ингредиента из списка в конструктор', () => {
    cy.get(MAIN_SELECTOR)
      .children(ADD_BUTTON_SELECTOR)
      .contains(ADD_TEXT)
      .click();
    cy.get(MAIN_SELECTOR)
      .find(COUNTER_NUM_SELECTOR)
      .should('contain', '1');
  });

  it('Тестирование работы модального окна', () => {
    cy.get(MAIN_SELECTOR).click();
    cy.get(MODALS_SELECTOR).should('be.not.empty');
    cy.get(MODALS_SELECTOR).find(ADD_BUTTON_SELECTOR).click();
  });
});

describe('Тестирование оформления заказа', () => {
  it('Проверка оформления заказа', () => {
    cy.get(MAIN_SELECTOR)
      .children(ADD_BUTTON_SELECTOR)
      .contains(ADD_TEXT)
      .click();
    cy.get(BUN_SELECTOR)
      .children(ADD_BUTTON_SELECTOR)
      .contains(ADD_TEXT)
      .click();
    cy.get(ADD_BUTTON_SELECTOR).contains(ORDER_BUTTON_TEXT).click();
    cy.get(MODALS_SELECTOR).find(ORDER_NUMBER_SELECTOR).contains('44819');
    cy.get(MODALS_SELECTOR).find(ADD_BUTTON_SELECTOR).click();
    cy.get(BURGER_CONTAINER_SELECTOR).find('li').should('not.exist');
  });
});
