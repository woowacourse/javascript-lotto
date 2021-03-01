import {
  MSG_BLANK_INPUT,
  MSG_INVALID_PAYMENT,
  MSG_OUT_RANGED_NUMBERS,
  MSG_OVERLAPPED_NUMBERS,
  MSG_SUFFIX,
} from '../../src/js/lotto/utils/constants.js';
import { typeInputValue, testInputValue } from '../utils/testInputValue.js';

describe('Lotto test', () => {
  before(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('구입 금액은 단위 금액의 양의 배수 값을 갖는다.', () => {
    const invalidValues = ['-1000', '0', '1500', '1000.1', ''];
    const input = '#payment-input';
    const button = '#payment-submit';

    invalidValues.forEach(invalidValue => {
      typeInputValue(input, invalidValue);
      testInputValue(button, MSG_INVALID_PAYMENT);
    });
    typeInputValue(input, '5000');
    testInputValue(button);
  });

  it('구입 금액 입력 뒤 버튼을 클릭했을 때, 로또 구매 섹션을 렌더링 한다.', () => {
    cy.get('#manual-purchasing-form').should('be.visible');
    cy.get('#auto-purchasing-button').should('be.visible');
  });

  it('수동 구매를 했을 때, 알맞은 개수의 로또를 렌더링 한다.', () => {
    const numbers = ['1', '2', '3', '4', '5', '45'];

    numbers.forEach((number, idx) => {
      typeInputValue(`[data-lotto-number=${idx}]`, number);
    });
    testInputValue('#manual-purchasing-submit');
    cy.get('#lotto-container') //
      .find('.lotto-wrapper')
      .should('have.length', 1);
  });

  it('잔액으로 자동 구매를 했을 때, 알맞게 누적된 로또를 렌더링한다.', () => {
    cy.get('#auto-purchasing-button').click();
    cy.get('#lotto-container') //
      .find('.lotto-wrapper')
      .should('have.length', 5);
  });

  it('잔액 내의 모든 로또 구매를 마치면, 결과 입력 창을 렌더링한다.', () => {
    cy.get('#lotto-result-form').should('be.visible');
  });

  it('토글 버튼을 클릭했을 때, 로또의 번호를 확인할 수 있다.', () => {
    testLottoToggle(5, 'on');
    testLottoToggle(5, 'off');

    function testLottoToggle(count, toggleOption) {
      cy.get('.switch').click();
      for (let idx = 0; idx < count; idx++) {
        cy.get('.lotto-wrapper') //
          .eq(idx)
          .children('[data-lotto-numbers]')
          .should(toggleOption === 'on' ? 'be.visible' : 'not.be.visible');
      }
    }
  });

  it('부적절한 당첨 번호를 검사한다. (중복)', () => {
    testWinnigNumbers(['1', '2', '3', '4', '5', '5', '45'], MSG_OVERLAPPED_NUMBERS + MSG_SUFFIX);
  });

  it('부적절한 당첨 번호를 검사한다. (범위 밖)', () => {
    testWinnigNumbers(['0', '2', '3', '4', '5', '6', '46'], MSG_OUT_RANGED_NUMBERS + MSG_SUFFIX);
  });

  it('부적절한 당첨 번호를 검사한다. (미입력)', () => {
    testWinnigNumbers(['1', '2', '3', '', '5', '6', '45'], MSG_BLANK_INPUT + MSG_SUFFIX);
  });

  it('적절한 당첨 번호를 입력 받아 결과를 모달창으로 띄운다.', () => {
    testWinnigNumbers(['1', '2', '3', '4', '5', '6', '45']);
    cy.get('#modal').should('be.visible');
  });

  function testWinnigNumbers(numbers, alertMessage = '') {
    numbers.forEach((number, idx) => {
      typeInputValue(`[data-winning-number=${idx}]`, number);
    });
    testInputValue('#result-submit', alertMessage);
  }

  it('다시 시작하기 버튼을 누르면 초기화 된다.', () => {
    cy.get('#reset-button').click();
    typeInputValue('#payment-input', '5000');
    testInputValue('#payment-submit');
    cy.get('#auto-purchasing-button').click();
    testWinnigNumbers(['1', '2', '3', '4', '5', '6', '45']);
    cy.get('#modal').should('be.visible');
  });
});
