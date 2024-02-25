import Lotto from '../../src/domain/Lotto';
import LottoMachine from '../../src/domain/LottoMachine';
import Money from '../../src/domain/Money';
import calculateROI from '../../src/domain/calculateROI';

describe('수익률 계산 테스트', () => {
  test('5등 1개, 5,000원 구입, 62.5% 수익률', () => {
    const money = new Money('8000');
    const lottoMachine = new LottoMachine(money);
    const myCustomLotto = [
      new Lotto([8, 21, 23, 41, 42, 43]),
      new Lotto([3, 5, 11, 16, 32, 38]),
      new Lotto([7, 11, 16, 35, 36, 44]),
      new Lotto([1, 8, 11, 31, 41, 42]),
      new Lotto([13, 14, 16, 38, 42, 45]),
      new Lotto([7, 11, 30, 40, 42, 43]),
      new Lotto([2, 13, 22, 32, 38, 45]),
      new Lotto([1, 3, 5, 14, 22, 45]),
    ];

    const winningLottoNumber = '1, 2, 3, 4, 5, 6';
    const bonusNumber = 7;

    lottoMachine.winningLotto = winningLottoNumber;
    lottoMachine.bonusNumber = bonusNumber;

    const matchResult = lottoMachine.countLottoRanks(myCustomLotto);

    expect(calculateROI(money, matchResult)).toBe(62.5);
  });

  test('1등 1개, 3,000원 구입, 66666666.7% 수익률', () => {
    const money = new Money('3000');
    const lottoMachine = new LottoMachine(money);
    const myCustomLotto = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([7, 8, 9, 10, 11, 12]),
      new Lotto([7, 8, 9, 10, 11, 12]),
    ];

    const winningLottoNumber = '1, 2, 3, 4, 5, 6';
    const bonusNumber = 44;

    lottoMachine.winningLotto = winningLottoNumber;
    lottoMachine.bonusNumber = bonusNumber;

    const matchResult = lottoMachine.countLottoRanks(myCustomLotto);

    expect(calculateROI(money, matchResult)).toBe(66666666.7);
  });
});
