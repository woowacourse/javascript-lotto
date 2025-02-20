import LottoMachine from '../../src/domains/LottoMachine';

describe('로또 기계 클래스 테스트', () => {
  describe('정상 케이스', () => {
    test('로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.', () => {
      const lottoCount = 4;
      const lottoMachine = new LottoMachine(lottoCount);

      expect(lottoMachine.lottos).toHaveLength(lottoCount);
    });
  });
});
