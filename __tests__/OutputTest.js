import { LottoMachine } from '../src/step1/LottoMachine.js'
import { Output } from '../src/step1/Output.js'
import { pickNumberInRange } from '../src/step1/Utils.js';

const logSpy = jest.spyOn(console, 'log');
jest.mock('../src/step1/Utils.js', () => ({
  readLine: jest.fn(),
  read: { close: jest.fn() },
  pickNumberInRange: jest.fn(),
}));

describe('출력 테스트', () => {
  beforeEach(() => {
    pickNumberInRange.mockReturnValue([1, 2, 3, 4, 5, 6]);
  });

  test('구입한 로또 개수 출력 테스트', () => {
    const lottoMachine = new LottoMachine(8000);

    Output.printPurchaseLottoCount(lottoMachine.getLottos().length);

    expect(logSpy).toHaveBeenCalledWith('\n8개를 구매했습니다.\n');
  });

  test('로또 번호 출력 테스트', () => {
    pickNumberInRange
      .mockReturnValueOnce([1, 2, 3, 4, 5, 6])
      .mockReturnValueOnce([15, 11, 13, 12, 14, 10])
      .mockReturnValueOnce([6, 5, 4, 3, 2, 1])
      .mockReturnValueOnce([44, 43, 33, 32, 45, 30])
      .mockReturnValueOnce([20, 25, 30, 10, 15, 40]);

    const lottoMachine = new LottoMachine(5000);

    Output.printLottos(lottoMachine.getLottos());

    expect(logSpy).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]')
    expect(logSpy).toHaveBeenCalledWith('[10, 11, 12, 13, 14, 15]')
    expect(logSpy).toHaveBeenCalledWith('[1, 2, 3, 4, 5, 6]')
    expect(logSpy).toHaveBeenCalledWith('[30, 32, 33, 43, 44, 45]')
    expect(logSpy).toHaveBeenCalledWith('[10, 15, 20, 25, 30, 40]')
  });

  test('최종 결과 출력 테스트', () => {
    pickNumberInRange
    .mockReturnValueOnce([4, 5, 6, 7, 8, 9])        // 5등
    .mockReturnValueOnce([4, 5, 6, 30, 31, 32])     // 5등
    .mockReturnValueOnce([3, 4, 5, 6, 30, 31])      // 4등
    .mockReturnValueOnce([2, 3, 4, 5, 6, 30])       // 3등
    .mockReturnValueOnce([2, 3, 4, 5, 6, 31])       // 3등
    .mockReturnValueOnce([2, 3, 4, 5, 6, 7]);       // 2등
    const lottoMachine = new LottoMachine(6000);
    lottoMachine.calculateMatchResult([1, 2, 3, 4, 5, 6], 7);

    Output.printResult(lottoMachine.getMatchResultSummary(), lottoMachine.getRateOfReturn());

    expect(logSpy).toHaveBeenCalledWith('3개 일치 (5,000원) - 2개');
    expect(logSpy).toHaveBeenCalledWith('4개 일치 (50,000원) - 1개');
    expect(logSpy).toHaveBeenCalledWith('5개 일치 (1,500,000원) - 2개');
    expect(logSpy).toHaveBeenCalledWith('5개 일치, 보너스 볼 일치 (30,000,000원) - 1개');
    expect(logSpy).toHaveBeenCalledWith('6개 일치 (2,000,000,000원) - 0개');
    expect(logSpy).toHaveBeenCalledWith('총 수익률은 551000.0%입니다.');
  });
});
