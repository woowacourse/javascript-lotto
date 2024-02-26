import { LOTTO_NUMBER_LENGTH, LOTTO_NUMBER_RANGE } from '../../src/constants/lotto-constants';
import lottoNumberValidator from '../../src/validator/lottoNumberValidator';

describe('lottoNumberValidator 객체 테스트', () => {
  const generateArrayByLength = (length) => Array.from({ length }, (_, i) => i + 1);

  describe(`로또 번호는 ${LOTTO_NUMBER_LENGTH}개여야한다.`, () => {
    test.each([
      {
        lottoNumbers: generateArrayByLength(LOTTO_NUMBER_LENGTH - 1),
        length: LOTTO_NUMBER_LENGTH - 1,
      },
      {
        lottoNumbers: generateArrayByLength(LOTTO_NUMBER_LENGTH + 1),
        length: LOTTO_NUMBER_LENGTH + 1,
      },
    ])('로또 번호 $lottoNumbers는 길이가 $length이므로 오류를 던진다.', ({ lottoNumbers }) => {
      expect(() => lottoNumberValidator.validateNumbersLength(lottoNumbers)).toThrow();
    });
  });

  test('로또 번호 배열안에 중복된 숫자가 있으면 오류를 던진다.', () => {
    const hasDuplicatedNumberArray = [1, 2, 3, 4, 5, 5];

    expect(() => lottoNumberValidator.validateDuplicate(hasDuplicatedNumberArray)).toThrow();
  });

  describe(`로또 번호 배열 안 숫자들의 범위가 ${LOTTO_NUMBER_RANGE.MIN}~${LOTTO_NUMBER_RANGE.MAX}가 아니면 오류를 던진다.`, () => {
    test.each([
      {
        description: '로또 번호 범위 최대값을 가지는',
        lottoNumbers: [1, 2, 3, 4, 5, LOTTO_NUMBER_RANGE.MAX],
      },
      {
        description: '로또 번호 범위 최소값을 가지는',
        lottoNumbers: [LOTTO_NUMBER_RANGE.MIN, 2, 3, 4, 5, 6],
      },
    ])('엣지 ) $description $lottoNumbers는 오류를 던지지 않는다.', ({ lottoNumbers }) => {
      expect(() => lottoNumberValidator.validateRange(lottoNumbers)).not.toThrow();
    });

    test.each([[[LOTTO_NUMBER_RANGE.MIN - 1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, LOTTO_NUMBER_RANGE.MAX + 1]]])(
      '예외 ) 로또 번호 %s는 범위를 넘어간 숫자가 있으므로 오류를 던진다.',
      (lottoNumbers) => {
        expect(() => lottoNumberValidator.validateRange(lottoNumbers)).toThrow();
      },
    );
  });
});
