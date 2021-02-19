import { testInputValue } from '../utils/index.js';
import { MSG_INVALID_PURCHASE_AMOUNT } from '../../src/js/constants/index.js';

describe('Lotto test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('구입 금액은 단위 금액의 양의 배수 값을 갖는다.', () => {
    const invalidValues = ['-1000', '0', '1500', '1000.1'];

    invalidValues.forEach(invalidValue => {
      testInputValue(
        '#purchase-amount-input',
        '#purchase-amount-submit',
        invalidValue,
        MSG_INVALID_PURCHASE_AMOUNT
      );
    });
    testInputValue('#purchase-amount-input', '#purchase-amount-submit', '5000');
  });

  it('구입 금액 입력 뒤 버튼을 클릭했을 때, 알맞은 개수의 로또를 렌더링한다.', () => {
    cy.get('#lotto-container') //
      .find('.lotto-wrapper')
      .should('have.length', 5);
  });

  it('토글 버튼을 클릭했을 때, 모든 복권 번호를 렌더링한다.', () => {
    testLottoToggle(5, 'on');
    testLottoToggle(5, 'off');

    function testLottoToggle(count, toggleOption) {
      cy.get('.switch').click();
      for (let idx = 0; idx < count; idx++) {
        cy.get('.lotto-wrapper') //
          .eq(idx)
          .children('.lotto-numbers')
          .should(toggleOption === 'on' ? 'be.visible' : 'not.be.visible');
      }
    }
  });
});
