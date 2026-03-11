import LottoRankCalculator from '../src/step-1/LottoRankCalculator.js';
import Lotto from '../src/step-1/Lotto.js';
import WinningLottoAndBonusNumber from '../src/step-1/WinningLottoAndBonusNumber.js';

describe('LottoRankCalculator 클래스 유닛 테스트', () => {
  describe('calculateLottoRanks', () => {
    test('당첨 번호와 일치하는 번호의 개수 + 보너스 번호의 포함 여부에 따라 올바른 등수 통계를 반환해야 한다.', () => {
      // given
      const lottos = [new Lotto([1, 2, 3, 4, 5, 6])];
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 7;

      const winningLottoAndBonusNumber = new WinningLottoAndBonusNumber(winningLotto, bonusNumber);

      // when
      const rank = LottoRankCalculator.calculateLottoRanks(lottos, winningLottoAndBonusNumber);

      // then
      expect(rank).toEqual({ 1: 1, 2: 0, 3: 0, 4: 0, 5: 0 });
    });
  });
});
