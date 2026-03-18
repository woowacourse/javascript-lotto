import { generateRandomNumber, generateUniqueRandomNumbers } from '../src/step-1/utils.js';

describe('utils 유닛테스트', () => {
  describe('generateRandomNumber', () => {
    test('1부터 주어진 값까지의 랜덤한 양의 정수를 반환한다.', () => {
      // given
      jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
      const to = 45;

      // when
      const result = generateRandomNumber(to);

      // then
      expect(result).toBe(23);
    });
  });

  describe('generateUniqueRandomNumbers', () => {
    test('입력받은 길이의 1부터 주어진 값까지의 랜덤한 양의 정수 배열을 반환한다.', () => {
      // given
      jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.7)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.2);
      const to = 45;
      const length = 6;

      // when
      const result = generateUniqueRandomNumbers(to, length);

      // then
      expect(result.length).toBe(6);
    });

    test('입력받은 길이의 1부터 주어진 값까지의 랜덤한 중복되지 않은 숫자 배열을 반환한다.', () => {
      // given
      jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.7)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.2);

      const to = 45;
      const length = 6;

      // when
      const result = generateUniqueRandomNumbers(to, length);
      const set = new Set([...result]);

      // then
      expect(set.size).toBe(6);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
