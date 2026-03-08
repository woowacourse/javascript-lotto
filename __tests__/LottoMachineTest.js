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

    expect(lottoMachine.getPurchaseCount()).toBe(1);

    lottoMachine = new LottoMachine(5000)
    expect(lottoMachine.getPurchaseCount()).toBe(5);

    lottoMachine = new LottoMachine(7000)
    expect(lottoMachine.getPurchaseCount()).toBe(7);
  });

  test('구입 개수 만큼 로또 생성 테스트', () => {
    pickNumberInRange
      .mockReturnValueOnce([1, 4, 5, 6, 8, 9])
      .mockReturnValueOnce([3, 17, 19, 21, 23, 31])
      .mockReturnValueOnce([35, 37, 39, 41, 42, 45]);
    const lottoMachine = new LottoMachine(3000);

    expect(lottoMachine.getLottos().length).toBe(3);
    expect(lottoMachine.getLottos()[0].getLottoNumber()).toEqual([1, 4, 5, 6, 8, 9]);
    expect(lottoMachine.getLottos()[1].getLottoNumber()).toEqual([3, 17, 19, 21, 23, 31]);
    expect(lottoMachine.getLottos()[2].getLottoNumber()).toEqual([35, 37, 39, 41, 42, 45]);
  });

  test('당첨 결과 매칭 테스트', () => {
    pickNumberInRange
      .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
      .mockReturnValueOnce([4, 5, 6, 7, 8, 9])
      .mockReturnValueOnce([2, 3, 4, 5, 6, 10])
      .mockReturnValueOnce([2, 3, 4, 5, 6, 11]);

    const lottoMachine = new LottoMachine(4000);
    lottoMachine.calculateMatchResult([1, 2, 3, 4, 5, 6], 10);
    expect(lottoMachine.getMatchResult()).toEqual(
      new Map([[1, 1], [2, 1], [3, 1], [4, 0], [5, 1]])
    );
  });

  test('총금액 계산 로직 테스트', () => {
    pickNumberInRange
      .mockReturnValueOnce([1, 2, 3, 4, 10, 11])  // 4개 일치 → rank 4 (50,000원)
      .mockReturnValueOnce([1, 2, 3, 10, 11, 12]); // 3개 일치 → rank 5 (5,000원)

    const lottoMachine = new LottoMachine(2000);
    lottoMachine.calculateMatchResult([1, 2, 3, 4, 5, 6], 7);

    expect(lottoMachine.getTotalPrize()).toBe(55000);
  });

  test('수익률 계산 로직 테스트', () => {
    pickNumberInRange
      .mockReturnValueOnce([1, 2, 3, 10, 11, 12])  // 3개 일치 → rank 5 (5,000원)
      .mockReturnValue([10, 11, 12, 13, 14, 15]);   // 나머지 → 미당첨

    const lottoMachine = new LottoMachine(8000);
    lottoMachine.calculateMatchResult([1, 2, 3, 4, 5, 6], 7);

    expect(lottoMachine.getRateOfReturn()).toBe('62.5');
  });
});
