import {
  HAS_A_WHITESPACE_MESSAGE,
  LESS_THAN_TICKET_PRICE_MESSAGE,
} from '../../../src/js/lib/constants/alertMessage';
import {
  TICKET_MIN_NUMBER,
  TICKET_MAX_NUMBER,
} from '../../../src/js/lib/constants/ticket';

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5000/');
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
    cy.get('#payment-input').type('5000');
    cy.get('#payment-submit').click();
    // cy.get('#');
  });
});
