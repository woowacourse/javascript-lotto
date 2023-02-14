/* eslint-disable */

describe('LottoMahcine 테스트', () => {
  let lotttoMachine;

  beforeEach(() => {
    lottoMachine = new LottoMachine();
  });

  test('주어진 값에 따라 로또 생성', () => {
    lottoMachine.buyLotto(5000);

    expect(lottoMachine.lottos.legnth === 5).toBeTruthy();
  });
});
