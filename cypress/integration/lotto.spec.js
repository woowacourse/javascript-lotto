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
    testInputValue(
      '#purchase-amount-input',
      '#purchase-amount-submit',
      '-1000',
      INVALID_PURCHASE_AMOUNT
    );
    testInputValue(
      '#purchase-amount-input',
      '#purchase-amount-submit',
      '0',
      INVALID_PURCHASE_AMOUNT
    );
    testInputValue(
      '#purchase-amount-input',
      '#purchase-amount-submit',
      '1500',
      INVALID_PURCHASE_AMOUNT
    );
    testInputValue(
      '#purchase-amount-input',
      '#purchase-amount-submit',
      '1000.1',
      INVALID_PURCHASE_AMOUNT
    );
    testInputValue('#purchase-amount-input', '#purchase-amount-submit', '5000');
  });
});
