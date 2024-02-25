import { SETTING, RANKING } from '../src/constant/setting';
import Lotto from '../src/domain/Lotto';
import WinningResultService from '../src/service/WinningResultService';

describe('[WinningResultService] 당첨 확인 로직 테스트', () => {
  test('각 등수별 로또 당첨 개수를 산출할 수 있다.', () => {
    // given
    const lottoNumbersList = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    const lottos = lottoNumbersList.map((lottoNumbers) => new Lotto(lottoNumbers));
    const winningNumbers = [2, 3, 4, 5, 6, 7];
    const bonusNumber = 1;
    const winningResultService = new WinningResultService(lottos, { winningNumbers, bonusNumber });

    // when
    const winningResult = winningResultService.getWinningResult(winningNumbers, bonusNumber);

    // then
    const expectedResult = {
      FIRST: 0,
      SECOND: 1,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };

    expect(winningResult).toEqual(expectedResult);
  });

  test('당첨 결과에 따른 수익률을 산출할 수 있다.', () => {
    // given
    const lottoNumbersList = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 36],
      [37, 38, 39, 40, 41, 42],
      [43, 44, 45, 40, 41, 42],
    ];
    const lottos = lottoNumbersList.map((lottoNumbers) => new Lotto(lottoNumbers));
    const winningNumbers = [1, 2, 3, 29, 30, 31];
    const bonusNumber = 5;
    const winningResultService = new WinningResultService(lottos, { winningNumbers, bonusNumber });

    // when
    const profitRate = winningResultService.getProfitRate();

    // then
    const expectedProfitRate = (
      (RANKING.FIFTH.REWARD * 100) /
      (lottoNumbersList.length * SETTING.LOTTO_PRICE)
    ).toString();
    expect(profitRate).toEqual(expectedProfitRate);
  });
});
