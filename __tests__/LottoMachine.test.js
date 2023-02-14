/* eslint-disable */

import LottoMachine from '../src/model/LottoMachine';

describe('LottoMahcine 테스트', () => {
  let lottoMachine;

  beforeEach(() => {
    lottoMachine = new LottoMachine();
  });

  test('주어진 값에 따라 로또 생성', () => {
    lottoMachine.buyLotto(5000);
    
    expect(lottoMachine.lottos.length === 5).toBeTruthy();
  });
});
