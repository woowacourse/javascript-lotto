import {
  DUPLICATE_WINNING_NUMBER,
  EXCEED_RANGE_NUMBER,
  LESS_THAN_TICKET_PRICE_MESSAGE,
} from '../../../src/js/lib/constants/alertMessage';

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('구입 금액을 입력받아 티켓을 생성한다.', () => {
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('#ticket-list > div').should('have.length', 5);
  });

  it('1000원 미만의 금액은 입력할 수 없다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('input[name=payment-input]').type('0');
    cy.get('button[name=payment-button]').click();
    cy.get('@alert').should('be.calledWith', LESS_THAN_TICKET_PRICE_MESSAGE);
  });

  it('한 번 로또를 구입하면 다시 구매할 수 없다.', () => {
    cy.get('input[name=payment-input]').type('1000');
    cy.get('button[name=payment-button]').click();
  });

  it('토글 버튼을 누르면 티켓의 번호를 보여준다.', () => {
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('.switch').click();
    cy.get('.ticket-number').should('have.length', 5);
  });

  it('각 티켓은 1-45 사이의 6개 랜덤 숫자를 가진다.', () => {
    cy.get('input[name=payment-input]').type('1000');
    cy.get('button[name=payment-button]').click();
    cy.get('.switch').click();
    cy.get('.ticket-number').then(elements => {
      elements[0].innerText.split(', ').forEach(number => {
        number = Number(number);
        expect(number).to.at.least(1);
        expect(number).to.at.most(45);
      });
    });
  });

  it('결과 확인 버튼을 누르면 당첨 통계, 수익률을 모달로 확인한다.', () => {
    let i = 1;
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('.winning-number').each(element => {
      cy.wrap(element).type(i++);
    });
    cy.get('.bonus-number').type(34);
    cy.get('#result').click();

    cy.get('.modal').should('be.visible');
  });

  it('다시 시작하기 버튼을 누르면 초기화되어서 다시 구매를 시작할 수 있다.', () => {
    let i = 1;
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('.winning-number').each(element => {
      cy.wrap(element).type(i++);
    });
    cy.get('.bonus-number').type(34);
    cy.get('#result').click();
    cy.get('#reset').click();
    cy.get('.modal').should('not.to.be.visible');
  });

  it('당첨번호는 1~45 사이의 숫자여야한다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('.winning-number[name=first]').type(99);
    cy.get('@alert').should('be.calledWith', EXCEED_RANGE_NUMBER);
  });

  it('당첨번호는 중복될 수 없다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('.winning-number').each(element => {
      cy.wrap(element).type(1);
    });
    cy.get('.bonus-number').type(34);
    cy.get('#result').click();
    cy.get('@alert').should('be.calledWith', DUPLICATE_WINNING_NUMBER);
  });
});
