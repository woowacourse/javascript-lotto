import { ALERT_MESSAGE } from '../../src/js/constants.js';

describe('LOTTO 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('사용자가 로또 구입 금액을 입력하고 확인 버튼을 누르면 금액에 맞는 로또가 화면에 보여진다.', () => {
    cy.get('#money-input').should('be.focused');
    cy.get('.lotto-list-container').should('not.be.visible');
    cy.get('.winning-number-form-container').should('not.be.visible');

    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-list-container').should('be.visible');
    cy.get('.winning-number-form-container').should('be.visible');

    cy.get('.lotto-count').should('have.text', '10');
    cy.get('.lotto').should('have.length', '10');

    cy.get('.winning-number').first().should('be.focused');
  });

  it('사용자가 토글 버튼을 누르면 로또의 번호를 볼 수 있다.', () => {
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();
    cy.get('#lotto-numbers-toggle').click();

    cy.get('.lotto-numbers').each(($elem) => {
      const numbers = $elem
        .text()
        .split(',')
        .map((number) => number.trim());
      expect(numbers.length).to.be.eq(6);

      numbers.forEach((_number) => {
        const number = Number(_number);
        expect(number).to.be.at.least(1);
        expect(number).to.be.at.most(45);
      });
    });
  });

  it('각 로또 안의 번호가 중복되지 않았는지 확인한다.', () => {
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();
    cy.get('#lotto-numbers-toggle').click();

    cy.get('.lotto-numbers').each(($elem) => {
      const numbers = $elem
        .text()
        .split(',')
        .map((number) => number.trim());
      const numbersSet = new Set(numbers);
      expect(numbers.length).to.be.eq(numbersSet.size);
    });
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

  it('사용자가 5500 원을 입력하면 화면에 로또가 5개 보여진다.', () => {
    cy.get('#money-input').type('5500');
    cy.get('#money-submit-button').click();

    cy.get('.lotto-list').children().should('have.length', 5);
  });

  it('로또 구입 후, 당첨 번호를 입력하고 결과 확인하기 버튼을 누르면, 모달에서 당첨 개수와 총 수익률을 확인할 수 있다.', () => {
    const winningNumbers = [9, 11, 3, 25, 21, 2];
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(45);
    cy.get('.open-result-modal-button').click();

    cy.get('.modal').should('be.visible');

    cy.get('.winning-count').each((count) => {
      cy.wrap(count)
        .invoke('text')
        .should('match', /^[0-9]+$/);
    });

    cy.get('.winning-rate')
      .first()
      .invoke('text')
      .should('match', /^[0-9]+\.[0-9]+$/);
  });

  it('다시 시작하기 버튼을 눌렀을 때, 구입할 금액 입력 폼만 보이는지 확인한다.', () => {
    const winningNumbers = [9, 11, 3, 25, 21, 2];
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(45);
    cy.get('.open-result-modal-button').click();

    cy.get('.modal').should('be.visible');

    cy.get('.restart-button').click();

    cy.get('#money-input').should('have.value', '').and('be.focused');
    cy.get('.lotto-list-container').should('not.be.visible');
    cy.get('.winning-number-form-container').should('not.be.visible');
    cy.get('.modal').should('not.be.visible');
  });

  it('닫기 버튼을 눌렀을 때, 모달이 잘 닫히는지 확인한다.', () => {
    const winningNumbers = [9, 11, 3, 25, 21, 2];
    cy.get('#money-input').type('10000');
    cy.get('#money-submit-button').click();

    cy.get('.winning-number').each((winningNumberInput, index) => {
      cy.wrap(winningNumberInput).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(45);
    cy.get('.open-result-modal-button').click();

    cy.get('.modal').should('be.visible');
    cy.get('.modal-close').click();

    cy.get('.modal').should('not.be.visible');
  });
});
