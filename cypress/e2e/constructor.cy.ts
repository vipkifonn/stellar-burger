import Cypress from 'cypress';
const URL_API = 'https://norma.nomoreparties.space/api';
const ID_MAIN = '643d69a5c3f7b9001cfa093e';
const ID_BUN = '643d69a5c3f7b9001cfa093d';
const MAIN_SELECTOR = `[data-cy=${ID_MAIN}]`;
const BUN_SELECTOR = `[data-cy=${ID_BUN}]`;

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
      .children('button')
      .contains('Добавить')
      .click();
    cy.get(MAIN_SELECTOR)
      .find('.counter__num')
      .should('contain', '1');
  });

  it('Тестирование работы модального окна', () => {
    cy.get(MAIN_SELECTOR).click();
    cy.get('#modals').should('be.not.empty');
    cy.get('#modals').find('button').click();
  });
});

describe('Тестирование оформления заказа', () => {
  it('Проверка оформления заказа', () => {
    cy.get(MAIN_SELECTOR)
      .children('button')
      .contains('Добавить')
      .click();
    cy.get(BUN_SELECTOR)
      .children('button')
      .contains('Добавить')
      .click();
    cy.get('button').contains('Оформить заказ').click();
    cy.get('#modals').find('h2').contains('44819');
    cy.get('#modals').find('button').click();
    cy.get('[data-cy=burger-container]').find('li').should('not.exist');
  });
});
