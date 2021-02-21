import { testInputValue, checkAlert } from '../utils/index.js';
import {
  MSG_INVALID_PURCHASE_AMOUNT,
  MSG_OVERLAPPED_LOTTO_NUMBERS,
  MSG_OUT_RANGED_LOTTO_NUMBERS,
} from '../../src/js/constants/index.js';

describe('Lotto test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('구입 금액은 단위 금액의 양의 배수 값을 갖는다.', () => {
    const invalidValues = ['-1000', '0', '1500', '1000.1', ''];

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
          .children('span[data-lotto-numbers]')
          .should(toggleOption === 'on' ? 'be.visible' : 'not.be.visible');
      }
    }
  });

  it('적절한 당첨 번호를 입력 받는다.', () => {
    testWinnigNumbers(
      ['1', '2', '3', '4', '5', '5', '45'],
      MSG_OVERLAPPED_LOTTO_NUMBERS
    );
    testWinnigNumbers(
      ['0', '2', '3', '4', '5', '6', '46'],
      MSG_OUT_RANGED_LOTTO_NUMBERS
    );
    testWinnigNumbers(
      ['1', '2', '3', ' ', '5', '6', '45'],
      MSG_OUT_RANGED_LOTTO_NUMBERS
    );
    testWinnigNumbers(['1', '2', '3', '4', '5', '6', '45']);

    function testWinnigNumbers(numbers, alertMessage = '') {
      numbers.forEach((number, idx) => {
        cy.get(`input[data-winning-number=${idx}]`).type(number);
      });
      cy.get('#result-submit').click();
      alertMessage && checkAlert(alertMessage);
    }
  });
});

//
// ['중복된 숫자', '범위 밖의 숫자'].join(', ')
// MSG_OVERLAPPED_LOTTO_NUMBERS + ALERT_SUFFIX
// 중복된 숫자, 범위 밖의 숫자는 입력할 수 없습니다.
