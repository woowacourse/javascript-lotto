import Lotto from '../../src/domain/Lotto';
import LottoMachine from '../../src/domain/LottoMachine';
import Money from '../../src/domain/Money';

describe('로또 머신 테스트', () => {
  test('8000원을 삽입하면 8개의 로또를 발행한다.', () => {
    const money = new Money('8000');
    const lottoMachine = new LottoMachine(money);

    expect(lottoMachine.lottos.length).toBe(8);
  });

  test('로또 당첨 내역 테스트 - 2등 1개, 4등 2개인 경우 ', () => {
    const money = new Money('3000');
    const lottoMachine = new LottoMachine(money);
    const myCustomLotto = [
      new Lotto([1, 2, 8, 9, 10, 11]),
      new Lotto([1, 2, 8, 9, 5, 10]),
      new Lotto([1, 2, 8, 9, 10, 11]),
    ];

    const winningLottoNumber = '1, 2, 8, 9, 5, 6';
    const bonusNumber = 10;

    lottoMachine.winningLotto = winningLottoNumber;
    lottoMachine.bonusNumber = bonusNumber;

    const lottoRanks = lottoMachine.countLottoRanks(myCustomLotto);

    expect(lottoRanks[1][1]).toBe(1);
    expect(lottoRanks[3][1]).toBe(2);
  });

  test('로또 당첨 내역 테스트 - 1등 1개, 5등 1개인 경우 ', () => {
    const money = new Money('3000');
    const lottoMachine = new LottoMachine(money);
    const myCustomLotto = [
      new Lotto([1, 2, 8, 9, 10, 11]),
      new Lotto([1, 2, 8, 12, 13, 14]),
      new Lotto([1, 2, 12, 13, 14, 15]),
    ];

    const winningLottoNumber = '1, 2, 8, 9, 10, 11';
    const bonusNumber = 45;

    lottoMachine.winningLotto = winningLottoNumber;
    lottoMachine.bonusNumber = bonusNumber;

    const lottoRanks = lottoMachine.countLottoRanks(myCustomLotto);
    console.log(lottoRanks);

    expect(lottoRanks[0][1]).toBe(1);
    expect(lottoRanks[4][1]).toBe(1);
    // TODO: 자료구조 알아보기 쉽게 map 같은거로 바꾸기
  });
});
