import Convertor from '../src/utils/Convertor';

describe('convertor 테스트', () => {
  test('배열을 문자열로 변환해 반환한다', () => {
    const ARRAIES = [
      [1, 2, 3, 4, 5, 6],
      ['a', 'b', 'c'],
    ];

    const EXPECTED = ['[1, 2, 3, 4, 5, 6]', '[a, b, c]'];

    ARRAIES.forEach((array, index) => {
      const STRINGIFIED_ARRAY = Convertor.stringifyLotto(array);
      expect(STRINGIFIED_ARRAY).toBe(EXPECTED[index]);
    });
  });
});
