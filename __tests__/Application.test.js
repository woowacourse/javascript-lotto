import GameApp from '../src/GameApp';
import { Console, RandomNumber } from '../src/utils';

const mockRandoms = (numbers) => {
  RandomNumber.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    RandomNumber.pickUniqueNumbersInRange,
  );
};

const mockQuestions = (inputs) => {
  const mockReadLineAsync = jest.spyOn(Console, 'readLineAsync');

  mockReadLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

describe('로또 게임 통합 테스트', () => {
  test('로또 게임을 실행하여, 통계와 수익률을 출력한다.', async () => {
    const INPUTS = ['8000', '1,2,3,4,5,6', '7'];
    const RANDOM_NUMBERS = [
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ];
    const RESULTS = [
      '3개 일치 (5,000원) - 1개',
      '4개 일치 (50,000원) - 0개',
      '5개 일치 (1,500,000원) - 0개',
      '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
      '6개 일치 (2,000,000,000원) - 0개',
      '총 수익률은 62.5%입니다.',
    ];

    const logSpy = getLogSpy();

    mockQuestions(INPUTS);
    mockRandoms(RANDOM_NUMBERS);

    const gameApp = new GameApp();

    await gameApp.run();

    RESULTS.forEach((result) => {
      console.log('result', result, logSpy);
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(result));
    });
  });
});
