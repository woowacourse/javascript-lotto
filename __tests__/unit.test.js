import LottoMachine from '../src/domain/LottoMachine';
import RankedLotto from '../src/domain/RankedLotto';

test('로또는 1000원 단위로 발급이 된다', () => {
  const lottoMoney = '3000';
  const lotto = new LottoMachine(lottoMoney);
  expect(lotto.countLotto(lottoMoney)).toBe(3);
});

test('로또 한 장당 6개의 번호가 부여된다.', () => {
  const lottoMoney = '1000';

  const lotto = new LottoMachine(lottoMoney);
  expect(lotto.randomNumberLotto().length).toEqual(6);
});

test('랜덤으로 부여된 번호는 오름차순으로 정렬된다', () => {
  const number = [3, 1, 5, 33, 10, 4];
  const lottoMoney = '1000';

  const lotto = new LottoMachine(lottoMoney);
  expect(lotto.sortedNumber(number)).toEqual([1, 3, 4, 5, 10, 33]);
});

test('당첨 통계', () => {
  const ranks = [6, 7, 3];
  const lotto = new RankedLotto();
  expect(lotto.getResult(ranks)).toEqual([1, 0, 0, 1, 1]);
});

test('수익률 구하기', () => {
  const lottoMoney = 1000;
  const result = [1, 0, 0, 0, 0];
  const rankedLotto = new RankedLotto();
  rankedLotto.earningsRate(lottoMoney, result);
  expect(rankedLotto.getProfit).toEqual(500);
});
