import { OUTPUT_MESSAGES } from '../src/constants';
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
  describe('사용자가 유효한 구매금액,당첨번호,보너스 번호를 입력한 때', () => {
    test('당첨 여부에 대한 당첨 통계와 수익률을 계산하여 이에 대해 출력한다.', async () => {
      const INPUTS = ['8000', '1,2,3,4,5,6', '7', 'n'];
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
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(result));
      });
    });
    test('게임 재시작 시, 등수 통계는 이전 게임에 영향을 받지 않는다.', async () => {
      const INPUTS = [
        '4000',
        '1,2,3,4,5,6',
        '7',
        'y',
        '4000',
        '1,2,3,4,5,6',
        '7',
        'n',
      ];
      const RANDOM_NUMBERS = [
        [8, 21, 3, 1, 42, 4],
        [3, 5, 11, 6, 32, 7],
        [7, 11, 16, 35, 36, 44],
        [1, 8, 11, 31, 41, 42],
        [1, 14, 16, 38, 42, 45],
        [7, 1, 3, 4, 2, 5],
        [2, 13, 22, 32, 38, 45],
        [1, 3, 15, 14, 22, 45],
      ];
      const RESULTS = [
        '3개 일치 (5,000원) - 2개',
        '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
        '3개 일치 (5,000원) - 0개',
        '5개 일치, 보너스 볼 일치 (30,000,000원) - 1개',
      ];

      const logSpy = getLogSpy();

      mockQuestions(INPUTS);
      mockRandoms(RANDOM_NUMBERS);

      const gameApp = new GameApp();

      await gameApp.run();

      RESULTS.forEach((result) => {
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(result));
      });
    });
  });
  describe('한 번의 로또 게임이 끝난 경우(당첨 통계와 수익을 출력 이후)', () => {
    test('게임 재시작 입력값을 입력하면 게임이 재시작 된다.', async () => {
      const INPUTS = [
        '4000',
        '1,2,3,4,5,6',
        '7',
        'y',
        '4000',
        '1,2,3,4,5,6',
        '7',
        'n',
      ];
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

      const logSpy = getLogSpy();

      mockQuestions(INPUTS);
      mockRandoms(RANDOM_NUMBERS);

      const gameApp = new GameApp();

      await gameApp.run();

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(OUTPUT_MESSAGES.restartGame),
      );
    });
    test('게임 종료 입력값을 입력하면 게임이  종료된다.', async () => {
      const INPUTS = ['4000', '1,2,3,4,5,6', '7', 'n'];
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

      const logSpy = getLogSpy();

      mockQuestions(INPUTS);
      mockRandoms(RANDOM_NUMBERS);

      const gameApp = new GameApp();

      await gameApp.run();

      expect(logSpy).not.toHaveBeenCalledWith(
        expect.stringContaining(OUTPUT_MESSAGES.restartGame),
      );

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(OUTPUT_MESSAGES.endGame),
      );
    });
  });
});
