import LottoGame from '../../src/domain/LottoGame.js';
import { LOTTO_CONDITION, RANKING } from '../../src/constants/constants.js';

describe('LottoGame 클래스 테스트', () => {
  test('addRankingCount 메서드를 사용하면 등수 카운트가 증가한다', () => {
    const lottoGame = new LottoGame();
    lottoGame.addRankingCount(1);

    expect(lottoGame.rank[1]).toBe(1);
  });
});

describe('calculateWinningRate 함수 테스트', () => {
  test.each([
    [LOTTO_CONDITION.PRICE * 5, RANKING.FIRST.PRIZE, (RANKING.FIRST.PRIZE / (LOTTO_CONDITION.PRICE * 5)) * 100],
    [LOTTO_CONDITION.PRICE * 5, RANKING.SECOND.PRIZE, (RANKING.SECOND.PRIZE / (LOTTO_CONDITION.PRICE * 5)) * 100],
  ])('구입 금액 %i원과 당첨금 %i원에 대한 수익률이 %f%%인지 확인한다', (price, prize, winningRate) => {
    expect(LottoGame.calculateWinningRate(price, prize)).toBe(winningRate);
  });
});

describe('calculateTotalPrize 함수 테스트', () => {
  const rank = { 1: 0, 2: 0, 3: 0, 4: 1, 5: 0 };

  test('로또 리스트의 총 상금을 계산한다', () => {
    expect(LottoGame.calculateTotalPrize(rank)).toBe(
      rank[RANKING.FIRST.RANK] * RANKING.FIRST.PRIZE +
        rank[RANKING.SECOND.RANK] * RANKING.SECOND.PRIZE +
        rank[RANKING.THIRD.RANK] * RANKING.THIRD.PRIZE +
        rank[RANKING.FOURTH.RANK] * RANKING.FOURTH.PRIZE +
        rank[RANKING.FIFTH.RANK] * RANKING.FIFTH.PRIZE,
    );
  });
});

describe('calculateRank 함수 테스트', () => {
  test.each([
    [6, false, 1],
    [5, true, 2],
    [5, false, 3],
    [4, false, 4],
    [3, false, 5],
  ])(`일치하는 개수(%i)와 보너스 여부(%s)에 따라 등수가 %i인지 확인한다`, (matchCount, isBonusMatch, rank) => {
    expect(LottoGame.calculateRank(matchCount, isBonusMatch)).toBe(rank);
  });
});
