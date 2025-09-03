const BASE_URL = 'https://norma.nomoreparties.space/api';
const BUN1 = '[data-cy=ingredient-643d69a5c3f7b9001cfa093c]';
const INGREDIENT1 = '[data-cy=ingredient-643d69a5c3f7b9001cfa0941]';

const CONSTRUCTOR_BUN_TOP = '.constructor-element_pos_top';
const CONSTRUCTOR_BUN_BOTTOM = '.constructor-element_pos_bottom';
const CONSTRUCTOR_FILLING = '.constructor-element';

const MODAL_CONTAINER = '#modals';
const MODAL_OVERLAY = '[data-cy=modal_overlay]';
const MODAL_CLOSE_BUTTON = '[data-cy=modal_close]';

const CONSTRUCTOR_ORDER_BUTTON = '[data-cy=order_button]';

beforeEach(() => {
    cy.intercept('GET', `${BASE_URL}/ingredients`, {
        fixture: 'ingredients.json'
    } );

    cy.intercept('GET', `${BASE_URL}/auth/login`, {
        fixture: 'user.json'
    });

    cy.intercept('GET', `${BASE_URL}/auth/user`, {
        fixture: 'user.json'
    });

    cy.intercept('POST', `${BASE_URL}/orders`, {
        fixture: 'order.json'
    });

    cy.viewport(1920, 1080);

    cy.visit('/');

})


describe('Добавление ингредиентов', () => {
    it('Добавление булки', () => {
       
        cy.get(BUN1).children('button').click();
        cy.get(BUN1).find('.counter__num').contains('1'); 


        cy.get(BUN1).find('[data-cy=ingredient-name]').invoke('text').then((ingredientText) => {
 
        cy.get(CONSTRUCTOR_BUN_TOP)
            .find('.constructor-element__text')
            .should('contain', ingredientText);
        
       
        cy.get(CONSTRUCTOR_BUN_BOTTOM)
            .find('.constructor-element__text')
            .should('contain', ingredientText);
        });
    }) 

     it('Добавление ингредиента', () => {
       
        cy.get(INGREDIENT1).children('button').click();
        cy.get(INGREDIENT1).find('.counter__num').contains('1'); 


        cy.get(INGREDIENT1).find('[data-cy=ingredient-name]').invoke('text').then((ingredientText) => {
 
            cy.get(CONSTRUCTOR_FILLING)
                .find('.constructor-element__text')
                .should('contain', ingredientText); 
            });
    }) 
 })

 describe('Модальное окно ингредиента', () => {
    it('Открытие модального окна', () => {
        cy.get(MODAL_CONTAINER).should('be.empty');
        cy.get(INGREDIENT1).children('a').click();
        cy.get(MODAL_CONTAINER).should('be.not.empty');
        cy.get(MODAL_CONTAINER).should('contain', 'Детали ингредиента');
    })

    it('Модальное окно показывает корректные данные', () => {
        cy.get(INGREDIENT1).find('[data-cy=ingredient-name]').invoke('text').then((ingredientText) => {
            cy.get(INGREDIENT1).children('a').click();
            cy.get(MODAL_CONTAINER).should('contain', ingredientText);
        })
    })

    it('Закрытие модального окна при клике на крестик', () => {
        cy.get(MODAL_CONTAINER).should('be.empty');
        cy.get(INGREDIENT1).children('a').click();
        cy.get(MODAL_CONTAINER).should('be.not.empty');
        
        cy.get(MODAL_CLOSE_BUTTON).click();
        cy.get(MODAL_CONTAINER).should('be.empty');
    })

    it('Закрытие модального окна при клике на оверлей', () => {
        cy.get(MODAL_CONTAINER).should('be.empty');
        cy.get(INGREDIENT1).children('a').click();
        cy.get(MODAL_CONTAINER).should('be.not.empty');
        
        cy.get(MODAL_OVERLAY).click('bottomRight', {
            force: true
        });
        
        cy.get(MODAL_CONTAINER).should('be.empty');
    })
})

describe('Создание заказа', () => { 
    beforeEach(() => {
        window.localStorage.setItem('refreshToken', 'refreshToken_test');
        cy.setCookie('accessToken', 'accessToken_test');
        cy.getAllLocalStorage().should('be.not.empty');
        cy.getCookie('accessToken').should('be.not.empty');
    });

    afterEach(() => {
        window.localStorage.clear();
        cy.clearAllCookies();
        cy.getAllLocalStorage().should('be.empty');
        cy.getAllCookies().should('be.empty');
    });
    
    it('создание заказа', () => {
        cy.get(BUN1).children('button').click();
        cy.get(INGREDIENT1).children('button').click(); 
        cy.get(CONSTRUCTOR_ORDER_BUTTON).click();

        cy.get(MODAL_CONTAINER).should('be.not.empty');
        cy.get(MODAL_CONTAINER).should('contain', "87656");

        cy.get(MODAL_CLOSE_BUTTON).click();
        cy.get(MODAL_CONTAINER).should('be.empty');

        cy.get(CONSTRUCTOR_BUN_TOP).should('not.exist');
        cy.get(CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
        cy.get(CONSTRUCTOR_FILLING).should('not.exist'); 
    })
 })
