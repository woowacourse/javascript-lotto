import {
  DUPLICATE_WINNING_NUMBER,
  HAS_A_WHITESPACE_MESSAGE,
  LESS_THAN_TICKET_PRICE_MESSAGE,
  INPUT_NOT_COMPLETED,
  EXCEED_RANGE_NUMBER,
} from '../../../src/js/lib/constants/alertMessage';
import {
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
} from '../../../src/js/lib/constants/lotto';

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('구입 금액을 입력받아 티켓을 생성한다.', () => {
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    cy.get('.ticket').should('have.length', 5);
  });

  it('공백은 입력할 수 없다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('#payment-submit').click();
    cy.get('@alert').should('be.calledWith', HAS_A_WHITESPACE_MESSAGE);
  });

  it('0과 음수는 입력할 수 없다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('#payment-input').type('0');
    cy.get('#payment-submit').click();
    cy.get('@alert').should('be.calledWith', LESS_THAN_TICKET_PRICE_MESSAGE);
  });

  it('한 번 로또를 구입하면 다시 구매할 수 없다.', () => {
    cy.get('#payment-input').type('1000');
    cy.get('#payment-submit').click();
    cy.get('#payment-submit').should('be.disabled');
  });

  it('토글 버튼을 누르면 티켓의 번호를 보여준다.', () => {
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    cy.get('.switch').click();
    cy.get('.lotto-numbers').should('have.length', 5);
  });

  it('각 티켓은 1-45 사이의 6개 랜덤 숫자를 가진다.', () => {
    cy.get('#payment-input').type('1000');
    cy.get('#payment-submit').click();
    cy.get('.switch').click();
    cy.get('.lotto-numbers').then(elements => {
      elements[0].innerText.split(', ').forEach(number => {
        number = Number(number);
        expect(number).to.at.least(TICKET_MIN_NUMBER);
        expect(number).to.at.most(TICKET_MAX_NUMBER);
      });
    });
  });

  it('결과 확인 버튼을 누르면 당첨 통계, 수익률을 모달로 확인한다.', () => {
    let i = 1;
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    cy.get('.winning-number').each(element => {
      cy.wrap(element).type(i++);
    });
    cy.get('.bonus-number').type(34);
    cy.get('#result-button').click();

    cy.get('.modal').should('be.visible');
  });

  it('다시 시작하기 버튼을 누르면 초기화되어서 다시 구매를 시작할 수 있다.', () => {
    let i = 1;
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    cy.get('.winning-number').each(element => {
      cy.wrap(element).type(i++);
    });
    cy.get('.bonus-number').type(34);
    cy.get('#result-button').click();
    cy.get('#reset-button').click();
    cy.get('.modal').should('not.to.be.visible');
  });

  it('당첨번호는 1~45 사이의 숫자여야한다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('.winning-number[name=first]').type(99);
    cy.get('@alert').should('be.calledWith', EXCEED_RANGE_NUMBER);
  });

  it('당첨번호는 중복될 수 없다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    cy.get('.winning-number').each(element => {
      cy.wrap(element).type(1);
    });
    cy.get('.bonus-number').type(34);
    cy.get('#result-button').click();
    cy.get('@alert').should('be.calledWith', DUPLICATE_WINNING_NUMBER);
  });

  it('결과확인 전에 구입 금액과 당첨번호를 모두 입력해야 한다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('#result-button').click();
    cy.get('@alert').should('be.calledWith', INPUT_NOT_COMPLETED);
  });
});
