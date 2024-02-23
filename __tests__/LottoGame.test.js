import LottoGenerator from '../src/controller/LottoGenerator';
import StatisticsGenerator from '../src/controller/StatisticsGenerator';
import Lotto from '../src/domain/Lotto';

describe('로또 게임 기능 테스트', () => {
  test('구입 금액에 해당하는 만큼 1장에 1,000원인 로또를 발행한다.', () => {
    const money = 5000;
    expect(LottoGenerator.createLotto(money).length).toBe(5);
  });

  test('사용자가 구매한 전체 로또의 당첨 내역을 계산한다.', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    const winningLotto = { winningNumbers, bonusNumber };

    const lottoTickets = [
      new Lotto([1, 2, 3, 4, 5, 6]),
      new Lotto([2, 3, 4, 5, 6, 7]),
      new Lotto([2, 3, 4, 5, 6, 8]),
      new Lotto([3, 4, 5, 6, 7, 8]),
      new Lotto([4, 5, 6, 7, 8, 9]),
    ];

    expect(StatisticsGenerator.calculateAllPrize(lottoTickets, winningLotto)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
    ]);
  });

  test('당첨 내역을 통해 수익률을 계산한다.', () => {
    const prizes = ['5', '0', '0', '0', '0', '0', '0', '0'];

    expect(StatisticsGenerator.calculateReturnOnInvestment(prizes)).toEqual(62.5);
  });
});
