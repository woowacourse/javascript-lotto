import LottoMachine from '../../src/domain/LottoMachine';

describe('로또 머신 테스트', () => {
  test('구입 금액에 해당하는 만큼 로또를 발행하는가',() => {
    const lottoMachine = new LottoMachine(8000);
    
    expect(lottoMachine.lottos.length).toBe(8);
  })
}) 