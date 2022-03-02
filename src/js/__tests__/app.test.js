import LottoCollectionImpl from '../LottoCollection/LottoCollectionImpl.js';
import LottoCountCalcultor from '../CalculatorImpl/LottoCountCalculator.js';

describe('입력한 요금만큼 로또를 생성할 수 있다.', () => {
  test('5000원을 입력하면 5개의 로또가 생성돼야 한다.', () => {
    const lottoManager = new LottoCollectionImpl();
    const fare = 5000;

    lottoManager.createLottos(new LottoCountCalcultor(fare).execute());

    expect(lottoManager.getLottos().length).toBe(5);
  });
});
