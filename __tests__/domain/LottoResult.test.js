import LottoResult from '../../src/domain/LottoResult.js';
import { RANKING, RANKING_ERROR_MESSAGE } from '../../src/constants/constants.js';

test('로또 등수 테스트', () => {
  const lottoResult = new LottoResult([1]);

  expect(lottoResult.result[1]).toBe(1);
});

test('총 상금 계산 테스트', () => {
  const lottoResult = new LottoResult([1, 2]);
  expect(lottoResult.totalPrize).toBe(RANKING.FIRST.PRIZE + RANKING.SECOND.PRIZE);
});

test('유효하지 않은 랭킹인 경우 에러 발생', () => {
  expect(() => new LottoResult([RANKING.FIRST - 1])).toThrow(RANKING_ERROR_MESSAGE);
});
