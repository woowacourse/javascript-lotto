/// <reference types="cypress" />

import {
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../../src/js/utils/constants.js';
import {
  generateLottoNumbers,
  isValidLottoNumbers,
} from '../../src/js/utils/lotto.js';

describe('LOTTO - 로또 생성에 대한 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('로또를 생성할 경우, 각 숫자는 1 ~ 45 사이의 중복되지 않은 6자리로 구성된다.', () => {
    for (let i = 0; i < 1000; i++) {
      const lottoNumbers = generateLottoNumbers(
        MIN_LOTTO_NUMBER,
        MAX_LOTTO_NUMBER,
      );

      expect(isValidLottoNumbers(lottoNumbers)).to.equal(true);
    }
  });
});
