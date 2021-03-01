import Lotto from "../../src/js/models/Lotto.js";
import { getRandomNumber } from '../../src/js/utils/util.js';
import { LOTTO_SETTINGS } from '../../src/js/utils/constants/settings.js';

context('로또 기능 테스트', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5500');
    });
  
    it('로또 자동 구매 시, 1 ~ 45 중 중복 없이 무작위 6개 숫자를 뽑아 저장한다.', () => {
      const lotto = new Lotto();
      lotto.createNumbers();
      const amountTestSet = new Set(lotto.getNumbers());
      expect(amountTestSet.size === LOTTO_SETTINGS.LOTTO_NUMBER_SIZE).to.equal(true);
  
      for (let i = LOTTO_SETTINGS.MIN_LOTTO_NUMBER; i <= LOTTO_SETTINGS.MAX_LOTTO_NUMBER; i++) {
        const randomNumber = getRandomNumber(LOTTO_SETTINGS.MIN_LOTTO_NUMBER, i);
        expect(randomNumber >= LOTTO_SETTINGS.MIN_LOTTO_NUMBER && randomNumber <= i).to.equal(true);
      }
    });
  });