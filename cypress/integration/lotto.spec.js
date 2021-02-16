import { testInputValue, checkAlert } from '../utils/test_input_value.js';
import {
  UNIT_AMOUNT,
  INVALID_PURCHASE_AMOUNT,
} from '../../src/js/constants/index.js';

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
        INVALID_PURCHASE_AMOUNT
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
    function testLottoToggle(count, option) {
      cy.get('.switch').click();
      for (let idx = 0; idx < count; idx++) {
        cy.get('.lotto-wrapper') //
          .eq(idx)
          .children('.lotto-numbers')
          .should(option === 'on' ? 'be.visible' : 'not.be.visible');
      }
    }

    testLottoToggle(5, 'on');
    testLottoToggle(5, 'off');
  });
});
