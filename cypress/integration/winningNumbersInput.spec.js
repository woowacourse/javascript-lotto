import { WINNING_NUMBER_CHECK_MESSAGE } from '../../src/js/constants';

describe('당첨번호 입력 검사', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('6개의 당첨번호와 1개의 보너스 번호가 모두 정상입력되기 전까지 결과확인하기 버튼이 비활성화 되어 있다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    cy.get('.open-result-modal-button').should('be.disabled');
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
      cy.get('.open-result-modal-button').should('be.disabled');
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.open-result-modal-button').should('not.be.disabled');
  });

  it('번호를 모두 입력했을 때 6개의 당첨번호 중 1 ~ 45 범위가 아닌 번호가 있으면, 입력칸 하단에 재입력 요청 메세지를 표시한다.', () => {
    const invalidWinningNumbers = [0, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    const { OUT_OF_RANGE } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number-check-message').should('not.be.visible');
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(invalidWinningNumbers[index]);
    });
    cy.get('.bonus-number').type(bonusNumber);
    cy.get('.winning-number-check-message').should('be.visible').should('have.text', OUT_OF_RANGE);
  });

  it('번호를 모두 입력했을 때 보너스번호가 1 ~ 45 범위가 아니면, 입력칸 하단에 재입력 요청 메세지를 표시한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const invalidBonusNumber = 77;
    const { OUT_OF_RANGE } = WINNING_NUMBER_CHECK_MESSAGE;

    cy.get('.winning-number-check-message').should('not.be.visible');
    cy.get('.winning-number').each(($el, index) => {
      cy.wrap($el).type(winningNumbers[index]);
    });
    cy.get('.bonus-number').type(invalidBonusNumber);
    cy.get('.winning-number-check-message').should('be.visible').should('have.text', OUT_OF_RANGE);
  });
});
