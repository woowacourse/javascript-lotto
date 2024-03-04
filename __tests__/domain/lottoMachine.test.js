import LottoMachine from '../../src/domain/LottoMachine';
import Money from '../../src/domain/Money';
import OutputView from '../../src/view/OutputView';

describe('로또 머신 테스트', () => {
  test('구입 금액에 해당하는 만큼 로또를 발행한다.', () => {
    const money = new Money(8000);
    const lottoMachine = new LottoMachine(money.count);

    expect(lottoMachine.lottos.length).toBe(8);
  });

  test('당첨 번호와 보너스 번호가 중복될 때, 예외가 발생한다.', () => {
    const money = new Money(8000);
    const winningLotto = '1, 2, 3, 4, 5, 6';
    const inputBonusNumber = '4';

    const lottoMachine = new LottoMachine(money.count);
    lottoMachine.winningLotto = winningLotto;
    expect(() => {
      lottoMachine.bonusNumber = inputBonusNumber;
    }).toThrow();
  });

  test('당첨된 로또 등수 내역 테스트', () => {
    const money = new Money(2000);
    const myCustomLotto = ['1, 2, 8, 9, 10, 11', '1, 2, 8, 9, 5, 10', '1, 2, 8, 9, 10, 11'];
    const lottoMachine = new LottoMachine(money.count, myCustomLotto);

    const winningLottoNumber = '1, 2, 8, 9, 5, 6';
    const bonusNumber = '10';

    lottoMachine.winningLotto = winningLottoNumber;
    lottoMachine.bonusNumber = bonusNumber;

    const lottoRanks = lottoMachine.countLottoRanks();
    lottoRanks.forEach((lottoRank, idx) => {
      OutputView.printLottoResult(lottoRank, idx);
    });

    expect(lottoRanks[1][1]).toBe(1);
    expect(lottoRanks[3][1]).toBe(2);
  });
});
