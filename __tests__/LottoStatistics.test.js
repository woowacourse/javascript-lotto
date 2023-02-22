import Lotto from '../src/domain/Lotto';
import LottoStatistics from '../src/domain/LottoStatistics';
import WinningNumbers from '../src/domain/WinningNumbers';
import BonusNumber from '../src/domain/BonusNumber';
import CorrectLotto from '../src/domain/CorrectLotto';

describe('LottoStatistics 클래스 테스트', () => {
  test('로또 당첨결과가 모두 일치할 때 1등인지 확인한다.', () => {
    const correctLotto = new CorrectLotto();

    correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,4,5,6'));
    correctLotto.setBonusNumber(new BonusNumber('7'));

    const rank = new LottoStatistics(correctLotto).determineLottoRank(
      new Lotto([1, 2, 3, 4, 5, 6])
    );

    expect(rank).toEqual(1);
  });

  test('로또 당첨결과가 5개 일치하고 보너스 번호가 일치할 때 2등인지 확인한다.', () => {
    const correctLotto = new CorrectLotto();

    correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,4,5,45'));
    correctLotto.setBonusNumber(new BonusNumber('6'));

    const rank = new LottoStatistics(correctLotto).determineLottoRank(
      new Lotto([1, 2, 3, 4, 5, 6])
    );

    expect(rank).toEqual(2);
  });

  test('로또 당첨결과가 5개 일치하고 보너스 번호가 일치하지 않을 때 3등인지 확인한다.', () => {
    const correctLotto = new CorrectLotto();

    correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,4,5,45'));
    correctLotto.setBonusNumber(new BonusNumber('44'));

    const rank = new LottoStatistics(correctLotto).determineLottoRank(
      new Lotto([1, 2, 3, 4, 5, 6])
    );

    expect(rank).toEqual(3);
  });

  test('로또 당첨결과가 4개 일치하고 4등인지 확인한다.', () => {
    const correctLotto = new CorrectLotto();

    correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,4,44,45'));
    correctLotto.setBonusNumber(new BonusNumber('33'));

    const rank = new LottoStatistics(correctLotto).determineLottoRank(
      new Lotto([1, 2, 3, 4, 5, 6])
    );

    expect(rank).toEqual(4);
  });

  test('로또 당첨결과가 3개 일치하고 5등인지 확인한다.', () => {
    const correctLotto = new CorrectLotto();

    correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,43,44,45'));
    correctLotto.setBonusNumber(new BonusNumber('33'));

    const rank = new LottoStatistics(correctLotto).determineLottoRank(
      new Lotto([1, 2, 3, 4, 5, 6])
    );

    expect(rank).toEqual(5);
  });

  test('로또 당첨 결과가 아무것도 없을 때 6등인지 확인한다.', () => {
    const correctLotto = new CorrectLotto();

    correctLotto.setWinningNumbers(new WinningNumbers('1,2,42,43,44,45'));
    correctLotto.setBonusNumber(new BonusNumber('33'));

    const rank = new LottoStatistics(correctLotto).determineLottoRank(
      new Lotto([1, 2, 3, 4, 5, 6])
    );

    expect(rank).toEqual(6);
  });

  test('모든 로또의 당첨 결과를 배열로 반환한다.', () => {
    const correctLotto = new CorrectLotto();

    correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,4,5,6'));
    correctLotto.setBonusNumber(new BonusNumber('7'));

    const result = new LottoStatistics(correctLotto).getAllLottosRank([
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([1, 2, 3, 4, 5, 7]),
      new Lotto([1, 2, 3, 4, 5, 8]),
      new Lotto([1, 2, 3, 4, 44, 45]),
      new Lotto([1, 2, 3, 43, 44, 45]),
      new Lotto([1, 2, 42, 43, 44, 45]),
    ]);

    expect(result).toEqual([1, 1, 1, 1, 1, 1]);
  });

  test('총 수익률을 계산한다.', () => {
    const correctLotto = new CorrectLotto();

    correctLotto.setWinningNumbers(new WinningNumbers('1,2,3,4,5,6'));
    correctLotto.setBonusNumber(new BonusNumber('7'));

    const statistics = new LottoStatistics(correctLotto);

    const winningLottos = statistics.getAllLottosRank([
      new Lotto([1, 2, 3, 40, 41, 42]),
    ]);

    expect(statistics.getProfitRate(winningLottos, 8000)).toEqual('62.5');
  });
});
