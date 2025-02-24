import { makeNotDuplicatedRandomNumbers } from '../src/Utils/math.js';
import { LOTTO_DEFINITION } from '../src/Domain/Constant/definition.js';

test('로또 1장당 범위내에서 중복되지 않는 랜덤한 번호 6개를 만든다.', () => {
  const lottoNumbers = makeNotDuplicatedRandomNumbers(
    LOTTO_DEFINITION.NUMBER_COUNTS,
    {
      min: LOTTO_DEFINITION.MIN_NUMBER,
      max: LOTTO_DEFINITION.MAX_NUMBER,
    }
  );
  expect(lottoNumbers.length).toBe(LOTTO_DEFINITION.NUMBER_COUNTS);
});
