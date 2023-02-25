import LottoMachine from '../src/domain/LottoMachine';
import LottoResult from '../src/domain/LottoResult';

test('로또는 1000원 단위로 발급이 된다', () => {
  const lottoMoney = '8000';
  const lottoMachine = new LottoMachine();
  expect(lottoMachine.countLotto(lottoMoney)).toBe(8);
});

test('로또 한 장당 6개의 번호가 부여된다.', () => {
  const lottoMoney = '3000';
  const lottoMachine = new LottoMachine();
  expect(lottoMachine.randomNumberLotto().length).toBe(6);
});

test('중복 여부 확인.', () => {
  const lottoNumber = [1, 2, 3, 4, 6, 6];

  const lottoMachine = new LottoMachine();

  expect(lottoMachine.hasDuplicates(lottoNumber)).toEqual(false);
});

test('구매한 로또를 갯수만큼 발행한다.', () => {
  const lottoMoney = '9000';

  const lottoMachine = new LottoMachine();

  lottoMachine.makeLotto(lottoMoney);

  expect(lottoMachine.lottoNumber.length).toBe(9);
});

test('랜덤으로 부여된 번호는 오름차순으로 정렬된다', () => {
  const number = [3, 1, 5, 33, 10, 4];

  const lottoMachine = new LottoMachine();

  expect(lottoMachine.ascendingSortedNumber(number)).toEqual([1, 3, 4, 5, 10, 33]);
});

test('등수를 확인한다. ', () => {
  const lottoNumber = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 7],
    [3, 4, 5, 9, 10, 11],
  ];
  const lottoMachine = new LottoMachine();

  lottoMachine.setLottoNumber(lottoNumber);
  const winningNumber = ['1', '2', '3', '4', '5', '6'];
  const bouseNumber = '7';

  expect(lottoMachine.compareNumber(winningNumber, bouseNumber)).toEqual([6, 7, 3]);
});

test('당첨 통계', () => {
  const lottoResult = new LottoResult();
  expect(lottoResult.getResult([6, 7, 3])).toEqual([1, 1, 0, 0, 1]);
});

test('수익률 구하기', () => {
  const lottoMoney = '8000';
  const lottoNumber = [
    [1, 2, 3, 4, 5, 6],
    [33, 35, 37, 41, 45, 42],
    [9, 18, 27, 36, 40, 45],
  ];
  const winningNumber = ['1', '2', '3', '4', '5', '6'];
  const bonusNumber = 7;

  const lottoMachine = new LottoMachine();
  lottoMachine.setLottoNumber(lottoNumber);
  const result = lottoMachine.getWinningStatus(winningNumber, bonusNumber);
  expect(lottoMachine.getProfitRate(lottoMoney, result)).toEqual(2500000);
});
