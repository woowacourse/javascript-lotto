import { LOTTO_PRICE, WINNING_NUMBER_CHECK_MESSAGE } from '../../src/js/constants';

describe('당첨번호 입력 검사', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
    cy.get('.purchase-amount-input').type(LOTTO_PRICE).type('{enter}');
  });

  it('로또를 구매하면 당첨번호를 입력할 수 있는 창이 표시된다.', () => {
    cy.get('.winning-number-form').should('be.visible');
  });

  it('6개의 당첨번호와 1개의 보너스번호가 모두 정상입력되기 전까지 결과확인하기 버튼이 비활성화 되어 있다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const { HAS_BLANK } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').first().should('have.focus');
    cy.get('.open-result-modal-button').should('be.disabled');
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
      cy.get('.open-result-modal-button').should('be.disabled');
      cy.get('.winning-number-check-message').should('have.text', HAS_BLANK);
      cy.get('.winning-number-check-message').should('have.class', 'text-red');
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.open-result-modal-button').should('not.be.disabled');
  });

  it('입력된 번호가 1 ~ 45 범위가 아니면, 입력칸 하단에 재입력 요청 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const invalidBonusNumber = 77;
    const { OUT_OF_RANGE } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(invalidBonusNumber);
    cy.get('.winning-number-check-message').should('have.text', OUT_OF_RANGE);
    cy.get('.winning-number-check-message').should('have.class', 'text-red');
  });

  it('입력된 번호에 중복된 값이 있으면, 입력칸 하단에 재입력 요청 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 6;
    const { DUPLICATED } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.winning-number-check-message').should('have.text', DUPLICATED);
    cy.get('.winning-number-check-message').should('have.class', 'text-red');
  });

  it('모든 번호가 올바르게 입력되면, 입력칸 하단에 결과 확인 가능 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const { COMPLETED } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.winning-number-check-message').should('have.text', COMPLETED);
    cy.get('.winning-number-check-message').should('have.class', 'text-green');
  });

  it('모든 번호가 올바르게 입력된 후에 입력한 숫자를 지우면, 입력칸 하단에 재입력 요청 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const { HAS_BLANK } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.bonus-number').type('{backspace}');
    cy.get('.winning-number-check-message').should('have.text', HAS_BLANK);
    cy.get('.winning-number-check-message').should('have.class', 'text-red');
  });
});
