import Lotto from '../src/Lotto.js';
import WinningLottoAndBonusNumber from '../src/WinningLottoAndBonusNumber.js';

describe('WinningLottoAndBonusNumber 클래스 유닛 테스트', () => {
  describe('생성자', () => {
    test('보너스 번호가 당첨 번호 안에 포함되면 예외를 반환한다.', () => {
      // given
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 6;

      // when & then
      expect(() => new WinningLottoAndBonusNumber(winningLotto, bonusNumber)).toThrow('당첨 번호와 보너스 번호는 중복될 수 없습니다.');
    });
  });

  describe('calculateLottoRank', () => {
    test('당첨 번호와 일치하는 번호의 개수가 6이면 1을 반환한다.', () => {
      // given
      const userLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const bonusNumber = 7;

      const winningLottoAndBonusNumber = new WinningLottoAndBonusNumber(winningLotto, bonusNumber);

      // when
      const rank = winningLottoAndBonusNumber.calculateRank(userLotto);

      // then
      expect(rank).toBe(1);
    });

    test('당첨 번호와 일치하는 번호의 개수가 5이고 보너스 번호를 포함하면 2를 반환한다.', () => {
      // given
      const userLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 7]);
      const bonusNumber = 6;

      const winningLottoAndBonusNumber = new WinningLottoAndBonusNumber(winningLotto, bonusNumber);

      // when
      const rank = winningLottoAndBonusNumber.calculateRank(userLotto);

      // then
      expect(rank).toBe(2);
    });

    test('당첨 번호와 일치하는 번호의 개수가 5이면 3을 반환한다.', () => {
      // given
      const userLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningLotto = new Lotto([1, 2, 3, 4, 5, 7]);
      const bonusNumber = 8;

      const winningLottoAndBonusNumber = new WinningLottoAndBonusNumber(winningLotto, bonusNumber);

      // when
      const rank = winningLottoAndBonusNumber.calculateRank(userLotto);

      // then
      expect(rank).toBe(3);
    });

    test('당첨 번호와 일치하는 번호의 개수가 4이면 4를 반환한다.', () => {
      // given
      const userLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningLotto = new Lotto([1, 2, 3, 4, 7, 8]);
      const bonusNumber = 5;

      const winningLottoAndBonusNumber = new WinningLottoAndBonusNumber(winningLotto, bonusNumber);

      // when
      const rank = winningLottoAndBonusNumber.calculateRank(userLotto);

      // then
      expect(rank).toBe(4);
    });

    test('당첨 번호와 일치하는 번호의 개수가 3이면 5를 반환한다.', () => {
      // given
      const userLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningLotto = new Lotto([1, 2, 3, 7, 8, 9]);
      const bonusNumber = 4;

      const winningLottoAndBonusNumber = new WinningLottoAndBonusNumber(winningLotto, bonusNumber);

      // when
      const rank = winningLottoAndBonusNumber.calculateRank(userLotto);

      // then
      expect(rank).toBe(5);
    });
  });
});
