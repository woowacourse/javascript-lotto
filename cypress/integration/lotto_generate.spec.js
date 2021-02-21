/// <reference types="cypress" />

import LottoManager from '../../src/js/model/LottoManager.js';

describe('LOTTO - 로또 생성에 대한 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('로또를 생성할 경우, 각 숫자는 1 ~ 45 사이의 중복되지 않은 6자리로 구성된다.', () => {
    const lottoManager = new LottoManager([]);
    for (let i = 0; i < 1000; i++) {
      const lottoNumbers = lottoManager.generateLottoNumbers();

      expect(LottoManager.isValidLottoNumbers(lottoNumbers)).to.equal(true);
    }
  });
});
