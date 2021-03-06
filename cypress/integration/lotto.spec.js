import { testInputValue } from '../utils/index.js';
import {
  MSG_INVALID_PURCHASE_AMOUNT,
  MSG_DUPLICATED_LOTTO_NUMBERS,
  MSG_OUT_RANGED_LOTTO_NUMBERS,
  MSG_BLANK_INPUT,
} from '../../src/js/constants/index.js';
import { typeInputValue } from '../utils/testInputValue.js';

describe('Lotto test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('구입 금액은 단위 금액의 양의 배수 값을 갖는다.', () => {
    const invalidValues = ['-1000', '0', '1500', '1000.1', ''];
    const input = '#purchase-amount-input';
    const button = '#purchase-amount-submit';

    invalidValues.forEach(invalidValue => {
      typeInputValue(input, invalidValue);
      testInputValue(button, MSG_INVALID_PURCHASE_AMOUNT);
    });
    typeInputValue(input, '5000');
    testInputValue(button);
  });

  it('자동 구매가 정상적으로 동작하는지 확인한다.', () => {
    typeInputValue('#auto-amount-input', 1);
    testInputValue('#auto-amount-submit');
  });

  it('자동, 수동 토글 버튼이 정상적으로 동작하는지 확인한다.', () => {
    cy.get('#auto-amount-purchase-form').should('be.visible');
    cy.get('#purchase-type-switch').click();
    cy.get('#manual-purchase-form').should('be.visible');
  });

  it('수동구매 시 부적절한 로또 번호를 검사한다. (중복)', () => {
    testManualNumbers(['1', '2', '3', '4', '5', '5'], MSG_DUPLICATED_LOTTO_NUMBERS);
  });

  it('수동구매 시 부적절한 로또 번호를 검사한다. (범위 밖)', () => {
    testManualNumbers(['0', '2', '3', '4', '5', '46'], MSG_OUT_RANGED_LOTTO_NUMBERS);
  });

  it('수동구매 시 부적절한 로또 번호를 검사한다. (미입력)', () => {
    testManualNumbers(['1', '2', '3', '', '5', '6'], MSG_BLANK_INPUT);
  });

  it('수동구매 시 적절한 번호를 입력하여 구매한다.', () => {
    testManualNumbers(['1', '2', '3', '4', '5', '6']);
  });

  it('로또 구매 시 남은 잔액이 정상적으로 뜨는지 확인한다.', () => {
    cy.get('#current-money').contains('3000');
  });

  it('구매 개수만큼 로또 이미지를 렌더링한다.', () => {
    cy.get('#lotto-container') //
      .find('.lotto-wrapper')
      .should('have.length', 2);
  });

  it('토글 버튼을 클릭했을 때, 모든 복권 번호를 렌더링한다.', () => {
    testLottoToggle(2, 'on');
    testLottoToggle(2, 'off');

    function testLottoToggle(count, toggleOption) {
      cy.get('#lotto-numbers-switch').click();
      for (let idx = 0; idx < count; idx++) {
        cy.get('.lotto-wrapper') //
          .eq(idx)
          .children('span[data-lotto-numbers]')
          .should(toggleOption === 'on' ? 'be.visible' : 'not.be.visible');
      }
    }
  });

  it('부적절한 당첨 번호를 검사한다. (중복)', () => {
    testWinnigNumbers(['1', '2', '3', '4', '5', '5', '45'], MSG_DUPLICATED_LOTTO_NUMBERS);
  });

  it('부적절한 당첨 번호를 검사한다. (범위 밖)', () => {
    testWinnigNumbers(['0', '2', '3', '4', '5', '6', '46'], MSG_OUT_RANGED_LOTTO_NUMBERS);
  });

  it('부적절한 당첨 번호를 검사한다. (미입력)', () => {
    testWinnigNumbers(['1', '2', '3', '', '5', '6', '45'], MSG_BLANK_INPUT);
  });

  it('적절한 당첨 번호를 입력 받아 결과 확인버튼을 누를 때 남은 잔액이 있을 시 confirm 창을 띄워 자동 구매를 진행한다.', () => {
    testWinnigNumbers(['1', '2', '3', '4', '5', '6', '45']);
    cy.get('#lotto-container') //
      .find('.lotto-wrapper')
      .should('have.length', 5);
    cy.get('#current-money').contains('0');
  });

  it('적절한 당첨 번호를 입력 받아 결과를 모달창으로 띄운다.', () => {
    cy.get('#modal').should('be.visible');
  });

  it('다시 시작하기 버튼을 누르면 초기화 된다.', () => {
    cy.get('#reset-button').click();
    typeInputValue('#purchase-amount-input', '5000');
    testInputValue('#purchase-amount-submit');
    testWinnigNumbers(['1', '2', '3', '4', '5', '6', '45']);
  });

  function testWinnigNumbers(numbers, alertMessage = '') {
    numbers.forEach((number, idx) => {
      typeInputValue(`[data-winning-number=${idx}]`, number);
    });
    testInputValue('#result-submit', alertMessage);
  }

  function testManualNumbers(numbers, alertMessage = '') {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] !== '') {
        cy.get('.lotto-number').eq(i).type(numbers[i]);
      }
    }
    testInputValue('#manual-purchase-submit', alertMessage);
  }
});
