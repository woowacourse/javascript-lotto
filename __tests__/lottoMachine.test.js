import LottoMachine from '../src/domain/lottoMachine.js';

describe('로또 기계 객체 테스트', () => {
  test('로또 구입 금액에 맞는 로또 개수를 발행한다.', () => {
    const cost = 5000;
    const lottoMachine = new LottoMachine(cost);
    const lottoCount = 5;

    expect(lottoMachine.getLottoCount).toBe(lottoCount);
  });
});
