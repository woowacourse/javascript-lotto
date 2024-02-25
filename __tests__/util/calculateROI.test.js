import LottoMachine from '../../src/domain/LottoMachine';
import Money from '../../src/domain/Money';
import calculateROI from '../../src/util/calculateROI';

test('수익률 테스트', () => {
  const money = new Money(8000);
  const myCustomLotto = [
    '8, 21, 23, 41, 42, 43',
    '3, 5, 11, 16, 32, 38',
    '7, 11, 16, 35, 36, 44',
    '1, 8, 11, 31, 41, 42',
    '13, 14, 16, 38, 42, 45',
    '7, 11, 30, 40, 42, 43',
    '2, 13, 22, 32, 38, 45',
    '1, 3, 5, 14, 22, 45',
  ];
  const lottoMachine = new LottoMachine(money, myCustomLotto);

  const winningLottoNumber = '1, 2, 3, 4, 5, 6';
  const bonusNumber = '7';

  lottoMachine.winningLotto = winningLottoNumber;
  lottoMachine.bonusNumber = bonusNumber;

  const matchResult = lottoMachine.countLottoRanks();

  expect(calculateROI(money, matchResult)).toBe(62.5);
});
