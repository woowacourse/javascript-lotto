import { ALERT_MESSAGE } from '../../src/js/constants.js';

describe('LOTTO 구매 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('구매할 금액을 입력한후 확인 버튼을 누르면 수동구매 폼이 나타난다.', () => {
    cy.get('.lotto-list-section').should('not.be.visible');
    cy.get('.winning-number-form-section').should('not.be.visible');

    // Note: Cypress 체크 시 autofocus가 잡히지 않는 문제가 있어 수동으로 focus를 잡아둠
    cy.get('#money-input').should('have.attr', 'autofocus', 'autofocus').focus();

    cy.focused().should('have.attr', 'id', 'money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-numbers-input-section').should('be.visible');
    cy.get('#lotto-numbers-input-first').should('be.focused');
    cy.get('.lotto-count').should('have.text', '10');

    cy.get('.lotto-list-section').should('be.visible');
    cy.get('.lotto').should('have.length', '0');

    cy.get('.winning-number-form-section').should('not.be.visible');
  });

  it('사용자가 0원을 입력하면 경고창을 띄운다.', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('#money-input').type('0');
    cy.get('#money-submit-button')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith(ALERT_MESSAGE.INVALID_MONEY_INPUT);
      });
  });

  it('사용자가 5500 원을 입력하면 5개의 로또가 구매된다..', () => {
    cy.get('#money-input').type('5500');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-count').should('have.text', '5');
  });

  it('입력 란에 숫자를 입력하고 확인 버튼을 누르면, 로또 목록에 로또가 1개 추가 되고, 토글 버튼을 눌러 번호를 확인할 수 있다.', () => {
    const lottoNumbers = [10, 11, 30, 25, 21, 20];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput)
        .should('have.value', '')
        .and('be.focused')
        .type(lottoNumbers[index]);
    });

    cy.get('#lotto-numbers-input-button').click();
    cy.get('.purchased-lotto-count').should('have.text', '1');
    cy.get('.lotto').should('have.length', '1');

    cy.get('#lotto-numbers-toggle').click();
    cy.get('.lotto-numbers').should('have.text', lottoNumbers.sort().join(', '));
  });

  it('자동구매 버튼을 누르면 남은 개수만큼의 로또가 자동으로 생성된다.', () => {
    const lottoNumbers = [10, 11, 30, 25, 21, 20];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput)
        .should('have.value', '')
        .and('be.focused')
        .type(lottoNumbers[index]);
    });

    cy.get('#lotto-numbers-input-button').click();
    cy.get('.purchased-lotto-count').should('have.text', '1');
    cy.get('.lotto').should('have.length', '1');

    cy.get('#lotto-numbers-auto-button').click();
    cy.get('.purchased-lotto-count').should('have.text', '10');
    cy.get('.lotto').should('have.length', '10');

    cy.get('.lotto-numbers-input-section').should('not.be.visible');
  });

  it('각 로또 안의 번호가 6개의 숫자로 이루어져 있고, 중복되지 않았는지 확인한다.', () => {
    const lottoNumbers = [10, 11, 30, 25, 21, 20];

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-number').each((lottoNumberInput, index) => {
      cy.wrap(lottoNumberInput)
        .should('have.value', '')
        .and('be.focused')
        .type(lottoNumbers[index]);
    });

    cy.get('#lotto-numbers-input-button').click();

    cy.get('.lotto-numbers').each(($elem) => {
      const numbers = $elem
        .text()
        .split(',')
        .map((number) => number.trim());
      expect(numbers.length).to.be.eq(6);
      const numbersSet = new Set(numbers);
      expect(numbers.length).to.be.eq(numbersSet.size);
    });
  });
});
