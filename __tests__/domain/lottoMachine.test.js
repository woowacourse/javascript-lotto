import Lotto from '../../src/domain/Lotto';
import LottoMachine from '../../src/domain/LottoMachine';
import Money from '../../src/domain/Money';

describe('로또 머신 테스트', () => {
  test('구입 금액에 해당하는 만큼 로또를 발행하는가', () => {
    const money = new Money(8000);
    const lottoMachine = new LottoMachine(money);

    expect(lottoMachine.lottos.length).toBe(8);
  });

  test('lotto 당첨 결과가 잘 나오는가 - 보너스가 없을때', () => {
    const money = new Money(1000);
    const lottoMachine = new LottoMachine(money);
    const myCustomLotto = new Lotto('1, 2, 8, 9, 10, 11');

    const winningLottoNumber = '1, 2, 3, 4, 5, 6';
    const bonusNumber = 45;

    lottoMachine.winningLotto = winningLottoNumber;
    lottoMachine.bonusNumber = bonusNumber;

    const matchResult = lottoMachine.judgeLottoGame([myCustomLotto]);

    expect(matchResult.get('lotto1').get('matchCount')).toBe(2);
    expect(matchResult.get('lotto1').get('isBonus')).toBe(false);
  });

  test('lotto 당첨 결과가 잘 나오는가 - 보너스가 있을때', () => {
    const money = new Money(1000);
    const lottoMachine = new LottoMachine(money);
    const myCustomLotto = new Lotto('1, 2, 8, 9, 10, 11');

    const winningLottoNumber = '1, 2, 3, 4, 5, 6';
    const bonusNumber = 8;

    lottoMachine.winningLotto = winningLottoNumber;
    lottoMachine.bonusNumber = bonusNumber;

    const matchResult = lottoMachine.judgeLottoGame([myCustomLotto]);

    expect(matchResult.get('lotto1').get('matchCount')).toBe(3);
    expect(matchResult.get('lotto1').get('isBonus')).toBe(true);
  });
});
