import Lotto from '../src/domain/lotto.js';
import { ERROR_MESSAGES } from '../src/constant/index.js';
import { LOTTO_RULES } from '../src/constant/index.js';

describe('로또 기능 테스트', () => {
  test(`로또 생성시 번호 개수가 ${LOTTO_RULES.length}개가 아닌 경우 에러를 반환한다`, () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6, 7];

    expect(() => {
      new Lotto(lottoNumbers);
    }).toThrow(ERROR_MESSAGES.incorrect_length);
  });

  test(`로또 생성시 번호 개수가 ${LOTTO_RULES.length}개인 경우 정상 작동한다`, () => {
    const lottoNumbers = [1, 2, 3, 4, 5, 6];

    expect(() => {
      new Lotto(lottoNumbers);
    }).not.toThrow(ERROR_MESSAGES.duplicate);
  });

  test('로또 생성시 중복된 번호가 있으면 에러를 반환한다', () => {
    const lottoNumbers = [1, 1, 2, 3, 4, 5];

    expect(() => {
      new Lotto(lottoNumbers);
    }).toThrow(ERROR_MESSAGES.duplicate);
  });

  test.each([[[1, 2, 3, 4, 5, 46]], [[0, 2, 3, 4, 15, 25]], [[1, 2, 13, 24, 35, 60]]])(
    '로또 생성시 번호가 1에서 45사이의 숫자가 아니면 에러를 반환한다',
    (lottoNumbers) => {
      expect(() => {
        new Lotto(lottoNumbers);
      }).toThrow(ERROR_MESSAGES.lotto_number_range);
    },
  );

  test('로또 번호 출력시 오름차순인지를 확인한다.', () => {
    const lottoNumbers = [3, 2, 5, 6, 12, 18];
    const result = [2, 3, 5, 6, 12, 18];
    const lotto = new Lotto(lottoNumbers);

    expect(lotto.getNumbers).toEqual(result);
  });
});
