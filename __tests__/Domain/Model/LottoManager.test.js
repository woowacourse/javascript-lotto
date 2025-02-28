import LottoManager from '../../../src/Domain/Model/LottoManager.js';
import WinningLotto from '../../../src/Domain/Model/WinningLotto.js';
import { LOTTO_PRIZE_DEFINITION } from '../../../src/Domain/Constant/definition.js';

describe('LottoManager 유효성 검사', () => {
  describe('로또 생성', () => {
    test('로또 장수에 따라 여러 장 발행한다.', () => {
      const lottoManager = new LottoManager();
      const lottoCount = 5;
      const lottoNumbers = () => [1, 2, 3, 4, 5, 6];
      lottoManager.makeLottoList(lottoCount, lottoNumbers);
      expect(lottoManager.getLottoList().length).toBe(lottoCount);
    });

    test('생성된 로또는 오름차순으로 정렬되어 있다.', () => {
      const lottoManager = new LottoManager();
      const lottoNumbers = () => [6, 5, 4, 3, 2, 1];
      lottoManager.makeLottoList(1, lottoNumbers);
      const lotto = lottoManager.getLottoList()[0];
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('당첨 결과 계산', () => {
    const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
    let lottoManager;

    beforeEach(() => {
      lottoManager = new LottoManager();
    });

    test('1등 당첨을 계산한다.', () => {
      const lottoNumbers = () => [1, 2, 3, 4, 5, 6];
      lottoManager.makeLottoList(1, lottoNumbers);
      const result = lottoManager.compareWinningLotto(winningLotto);
      expect(result[LOTTO_PRIZE_DEFINITION.FIRST_PRIZE]).toBe(1);
    });

    test('2등 당첨을 계산한다.', () => {
      const lottoNumbers = () => [1, 2, 3, 4, 5, 7];
      lottoManager.makeLottoList(1, lottoNumbers);
      const result = lottoManager.compareWinningLotto(winningLotto);
      expect(result[LOTTO_PRIZE_DEFINITION.SECOND_PRIZE]).toBe(1);
    });

    test('3등 당첨을 계산한다.', () => {
      const lottoNumbers = () => [1, 2, 3, 4, 5, 8];
      lottoManager.makeLottoList(1, lottoNumbers);
      const result = lottoManager.compareWinningLotto(winningLotto);
      expect(result[LOTTO_PRIZE_DEFINITION.THIRD_PRIZE]).toBe(1);
    });
    test('4등 당첨을 계산한다.', () => {
      const lottoNumbers = () => [1, 2, 3, 4, 8, 9];
      lottoManager.makeLottoList(1, lottoNumbers);
      const result = lottoManager.compareWinningLotto(winningLotto);
      expect(result[LOTTO_PRIZE_DEFINITION.FOURTH_PRIZE]).toBe(1);
    });

    test('5등 당첨을 계산한다.', () => {
      const lottoNumbers = () => [1, 2, 3, 8, 9, 10];
      lottoManager.makeLottoList(1, lottoNumbers);
      const result = lottoManager.compareWinningLotto(winningLotto);
      expect(result[LOTTO_PRIZE_DEFINITION.FIFTH_PRIZE]).toBe(1);
    });

    test('당첨 되지 않음을 계산한다.', () => {
      const lottoNumbers = () => [1, 2, 8, 9, 10, 11];
      lottoManager.makeLottoList(1, lottoNumbers);
      const result = lottoManager.compareWinningLotto(winningLotto);
      expect(result[LOTTO_PRIZE_DEFINITION.NONE]).toBe(1);
    });
  });
});
