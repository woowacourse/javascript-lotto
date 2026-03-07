import { LottoMachine } from '../src/step1/LottoMachine.js';
import { pickNumberInRange } from '../src/step1/Utils.js';

jest.mock('../src/step1/Utils.js', () => ({
  readLine: jest.fn(),
  read: { close: jest.fn() },
  pickNumberInRange: jest.fn(),
}));


describe('로또 머신 테스트', () => {
  test('로또 생성 테스트', () => {
    pickNumberInRange.mockReturnValueOnce([1, 4, 5, 6, 8, 9]);

    const lottoMachine = new LottoMachine();
    const lotto = lottoMachine.createLotto();

    expect(lotto.getLottoNumber()).toEqual([1, 4, 5, 6, 8, 9]);
  });

  test('로또 생성 개수 테스트', () => {
    pickNumberInRange.mockReturnValue([1, 4, 5, 6, 8, 9]);
    let lottoMachine = new LottoMachine(1000);

    expect(lottoMachine.purchaseCount).toBe(1);

    lottoMachine = new LottoMachine(5000)
    expect(lottoMachine.purchaseCount).toBe(5);

    lottoMachine = new LottoMachine(7000)
    expect(lottoMachine.purchaseCount).toBe(7);
  });

  test('구입 개수 만큼 로또 생성 테스트', () => {
    pickNumberInRange
      .mockReturnValueOnce([1, 4, 5, 6, 8, 9])
      .mockReturnValueOnce([3, 17, 19, 21, 23, 31])
      .mockReturnValueOnce([35, 37, 39, 41, 42, 45]);
    const lottoMachine = new LottoMachine(3000);

    expect(lottoMachine.lottos.length).toBe(3);
    expect(lottoMachine.lottos[0].getLottoNumber()).toEqual([1, 4, 5, 6, 8, 9]);
    expect(lottoMachine.lottos[1].getLottoNumber()).toEqual([3, 17, 19, 21, 23, 31]);
    expect(lottoMachine.lottos[2].getLottoNumber()).toEqual([35, 37, 39, 41, 42, 45]);
  });

  test('총금액 계산 로직 테스트', () => {
    pickNumberInRange
    .mockReturnValueOnce([1, 2, 3, 4, 5, 6])   // 1등
    .mockReturnValueOnce([2, 3, 4, 5, 6, 7])   // 2등
    .mockReturnValueOnce([2, 3, 4, 5, 6, 10])  // 3등
    .mockReturnValueOnce([3, 4, 5, 6, 7, 8])   // 4등
    .mockReturnValueOnce([4, 5, 6, 10, 11, 12]); // 5등

    const lottoMachine = new LottoMachine(5000);
    lottoMachine.calculateMatchResult([1, 2, 3, 4, 5, 6], 7);
    expect(lottoMachine.getTotalPrize()).toBe(2_031_555_000);
  });

  test('수익률 계산 로직 테스트', () => {
    pickNumberInRange
    .mockReturnValueOnce([10, 20, 30, 40, 41, 42])
    .mockReturnValueOnce([1, 5, 6, 7, 8, 9])
    .mockReturnValueOnce([1, 5, 6, 7, 8, 9])
    .mockReturnValueOnce([1, 5, 6, 7, 8, 9])
    .mockReturnValueOnce([1, 5, 6, 7, 8, 9])
    .mockReturnValueOnce([1, 5, 6, 7, 8, 9])
    .mockReturnValueOnce([1, 5, 6, 7, 8, 9])
    .mockReturnValueOnce([1, 5, 6, 7, 8, 9]);

    const lottoMachine = new LottoMachine(8000);
    lottoMachine.calculateMatchResult([1, 2, 3, 10, 20, 30], 7);
    expect(lottoMachine.getRateOfReturn()).toBe('62.5');
  });
});
