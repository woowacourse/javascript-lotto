import Lotto from '../src/domain/Lotto';
import RankedLotto from '../src/domain/RankedLotto';

test('로또는 1000원 단위로 발급이 된다', () => {
  const lottoMoney = '1001';
  expect(() => {
    const lotto = new Lotto(lottoMoney);
  }).toThrow();
});

// test('로또 한 장당 6개의 번호가 부여된다.', () => {
//   const lottoMoney = '1000';
//   const lotto = new Lotto(lottoMoney);
//   expect(lotto.lottoNumber.length).toBe(0);
// });

// test('한 장당 부여된 번호는 1부터 45까지 랜덤으로 발행된다.', () => {
//   const lottoMoney = '1000';
//   const lottoNumber = [1, 2, 3, 4, 5, 6];

//   const lotto = new Lotto(lottoMoney, lottoNumber);
//   expect(lotto.randomNumberLotto()).toEqual(true);
// });

// test('중복 여부 확인.', () => {
//   const lottoMoney = '1000';
//   const lottoNumber = [1, 2, 3, 4, 6, 6];

//   const lotto = new Lotto(lottoMoney, lottoNumber);
//   expect(lotto.compareSameNumberInLotto(lottoNumber)).toEqual(false);
// });

test('구매한 로또를 갯수만큼 발행한다.', () => {
  const lottoMoney = '2000';

  const lotto = new Lotto(lottoMoney);

  lotto.makeLotto();

  expect(lotto.#lottoNumber.length).toBe(2);
});

test('랜덤으로 부여된 번호는 오름차순으로 정렬된다', () => {
  const number = [3, 1, 5, 33, 10, 4];
  const lottoMoney = '1000';

  const lotto = new Lotto(lottoMoney);
  expect(lotto.sortedNumber(number)).toEqual([1, 3, 4, 5, 10, 33]);
});

test('등수를 확인한다. ', () => {
  const lottoMoney = '1000';

  const lottoNumber = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 7],
    [3, 4, 5, 9, 10, 11],
  ];
  const lotto = new Lotto(lottoMoney, lottoNumber);

  const winningNumber = [1, 2, 3, 4, 5, 6];
  const bouseNumber = 7;

  expect(lotto.compareNumber(winningNumber, bouseNumber)).toEqual([6, 7, 3]);
});

// test('당첨 통계', () => {

//     const winningNumber = [1,2,3,4,5,6]
//     const bouseNumber = 7

//     const rankedLotto = new RankedLotto(winningNumber, bouseNumber);

//     expect(rankedLotto.statisticalChart()).toEqual([6, 7, 3])
// })

// test('당첨 통계', () => {
//   const winningNumber = [1, 2, 3, 4, 5, 6];
//   const bouseNumber = 7;

//   const rankedLotto = new RankedLotto(winningNumber, bouseNumber);
//   rankedLotto.statisticalChart();
//   expect(rankedLotto.result).toEqual([1, 1, 0, 0, 1]);
// });

test('수익률 구하기', () => {
  const winningNumber = [1, 2, 3, 4, 5, 6];
  const bouseNumber = 7;

  const rankedLotto = new RankedLotto(winningNumber, bouseNumber);
  rankedLotto.statisticalChart();
  rankedLotto.earningsRate(8000);
  expect(rankedLotto.profit).toEqual(62.5);
});
