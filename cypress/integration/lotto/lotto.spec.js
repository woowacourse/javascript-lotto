import {
  DUPLICATE_NUMBER_MESSAGE,
  EXCEED_RANGE_NUMBER,
  LESS_THAN_TICKET_PRICE_MESSAGE,
} from '../../../src/js/lib/constants/alertMessage';
import { TICKET_MAX_NUMBER } from '../../../src/js/lib/constants/lotto';

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('1000원 미만의 금액은 입력할 수 없다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('input[name=payment-input]').type('0');
    cy.get('button[name=payment-button]').click();
    cy.get('@alert').should('be.calledWith', LESS_THAN_TICKET_PRICE_MESSAGE);
  });

  it('티켓 구매 금액 입력 시, 발급 가능한 티켓 수량을 보여준다.', () => {
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('#lotto-issue-modal').should('be.visible');
    cy.get('#issuable-ticket-amount').should('have.text', 5);
  });

  it('수동으로 번호 6자리를 입력해 티켓을 발급한다.', () => {
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('.js-manual-input').each((element, idx) => {
      cy.wrap(element).type(idx + 1);
    });
    cy.get('#manual-submit').click();
    cy.get('#issued-ticket-list .issued-ticket').should('have.length', 1);
  });

  it('발급 시, 발급 가능한 티켓 수량을 차감한다.', () => {
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('.js-manual-input').each((element, idx) => {
      cy.wrap(element).type(idx + 1);
    });
    cy.get('#manual-submit').click();
    cy.get('#issuable-ticket-amount').should('have.text', 4);
  });

  it('발급 가능한 티켓이 0장이면 티켓을 발급할 수 없다.', () => {
    cy.get('input[name=payment-input]').type('1000');
    cy.get('button[name=payment-button]').click();
    cy.get('.js-manual-input').each((element, idx) => {
      cy.wrap(element).type(idx + 1);
    });
    cy.get('#manual-submit').click();
    cy.get('.js-manual-input').each(element => {
      cy.wrap(element).should('be.disabled');
    });
    cy.get('#manual-submit').should('be.disabled');
  });

  it('중복된 번호를 제출하면 에러메시지가 노출된다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('input[name=payment-input]').type('1000');
    cy.get('button[name=payment-button]').click();
    cy.get('.js-manual-input').each(element => {
      cy.wrap(element).type(1);
    });
    cy.get('#manual-submit').click();
    cy.get('@alert').should('be.calledWith', DUPLICATE_NUMBER_MESSAGE);
  });

  it('당첨번호는 1~45 사이의 숫자여야한다.', () => {
    cy.window().then(window => cy.stub(window, 'alert').as('alert'));
    cy.get('input[name=payment-input]').type('1000');
    cy.get('button[name=payment-button]').click();
    cy.get('.js-manual-input').each(element => {
      cy.wrap(element).type(TICKET_MAX_NUMBER + 1);
    });
    cy.get('@alert').should('be.calledWith', EXCEED_RANGE_NUMBER);
  });

  it('수동 구매 종료 시, 나머지 발급 가능한 티켓을 자동 구매한다.', () => {
    cy.get('input[name=payment-input]').type('5000');
    cy.get('button[name=payment-button]').click();
    cy.get('#lotto-issue-end-button').click();
    cy.get('#ticket-list .issued-ticket').should('have.length', 5);
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
    cy.get('@alert').should('be.calledWith', DUPLICATE_NUMBER_MESSAGE);
  });
});
