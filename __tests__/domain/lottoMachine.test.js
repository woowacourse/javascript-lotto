import LOTTO_RULE from '../../src/constants/rules/lottoRule';
import Lotto from '../../src/domain/Lotto';
import LottoMachine from '../../src/domain/LottoMachine';
import Money from '../../src/domain/Money';

describe('로또 머신 테스트', () => {
  test('구입 금액에 해당하는 만큼 로또를 발행하는가', () => {
    const money = new Money(8000);
    const lottoMachine = new LottoMachine(money);

    expect(lottoMachine.lottos.length).toBe(8);
  });

  test('당첨된 로또 등수 내역 테스트', () => {
    const money = new Money(2000);
    const lottoMachine = new LottoMachine(money);
    const myCustomLotto = [
      new Lotto('1, 2, 8, 9, 10, 11'),
      new Lotto('1, 2, 8, 9, 5, 10'),
      new Lotto('1, 2, 8, 9, 10, 11'),
    ];

    const winningLottoNumber = '1, 2, 8, 9, 5, 6';
    const bonusNumber = 10;

    lottoMachine.winningLotto = winningLottoNumber;
    lottoMachine.bonusNumber = bonusNumber;

    const matchResult = lottoMachine.countLottoRanks(myCustomLotto);

    expect(matchResult.get(LOTTO_RULE.RANK[1])).toBe(1);
    expect(matchResult.get(LOTTO_RULE.RANK[3])).toBe(2);
  });
});
