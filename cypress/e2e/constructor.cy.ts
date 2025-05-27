describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000'); 
    });
});

import { deleteCookie, setCookie } from '../../src/utils/cookie';

const URL = 'https://norma.nomoreparties.space/api'

describe('Тест конструктора бургеров', () => {

  beforeEach(() => {
    setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM');
    localStorage.setItem('refreshToken', '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556');
    cy.intercept('GET', `${URL}//auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('http://localhost:4000/');
    cy.wait('@getUser');
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Тест получения списка ингредиентов с сервера', () => {
    cy.get('[data-cy="constructor"]').as('constructor');


    cy.get(`[data-cy="Булки"]`).children().first().children('button').click();
    cy.get(`[data-cy="Начинки"]`).children().first().children('button').click();

    cy.get('@constructor').should('contain', 'Краторная булка N-200i');
    cy.get('@constructor').should('contain', 'Биокотлета из марсианской Магнолии');
  });
  
  it('Тест открытия и закрытия модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', 'Краторная булка N-200i');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');

    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('@modal').should('exist');

    cy.get('[data-cy="modal-overlay"]').click('left', { force: true });
    cy.get('@modal').should('not.exist');
  });

  
  it('Тест создания заказа', () => {
    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as('orderBurgerApi');
    cy.get('[data-cy="constructor"]').as('constructor');

    cy.get(`[data-cy="Булки"]`).children().first().children('button').click();
    cy.get(`[data-cy="Начинки"]`).children().first().children('button').click();

    cy.get('[data-cy="order"]').children('div').children('button').click();

    
    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('exist');
    cy.get('@modal').should('contain', '66666');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');
    
    

    cy.get('[data-cy="order"]').should('not.contain', 'Биокотлета из марсианской Магнолии');
    cy.get('[data-cy="order"]').should('not.contain', 'Краторная булка N-200i');

    cy.wait('@orderBurgerApi');
    
  })
    
});