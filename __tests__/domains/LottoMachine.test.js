<<<<<<< HEAD
import { PURCHASE_PRICE } from '../../src/constants/Configurations';
=======
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
import LottoMachine from '../../src/domains/LottoMachine';

describe('로또 기계 클래스 테스트', () => {
  describe('정상 케이스', () => {
    test('로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.', () => {
<<<<<<< HEAD
      const purchasePrice = 4000;
      const lottoCount = purchasePrice / PURCHASE_PRICE.UNIT;
      const lottoMachine = new LottoMachine(purchasePrice);
=======
      const lottoCount = 4;
      const lottoMachine = new LottoMachine(lottoCount);
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693

      expect(lottoMachine.lottos).toHaveLength(lottoCount);
    });
  });
});
