import { LOTTO } from "../src/constant/lotto.js";
import generateLotto from "../src/LottoMachine.js";

test(`${LOTTO.LENGTH}개의 숫자로 이루어진 로또를 생성한다.`, () => {
  const lotto = generateLotto();

  expect(lotto.numbers.length).toBe(LOTTO.LENGTH);
});

test(`중복 없는 숫자를 생성한다.`, () => {
  const lotto = generateLotto();

  expect(lotto.numbers.length === new Set(lotto.numbers).size).toBe(true);
});

test(`생성된 모든 숫자는 ${LOTTO.MIN_RANDOM_VALUE}~${LOTTO.MAX_RANDOM_VALUE} 사이이다.`, () => {
  const lotto = generateLotto();
  const filteredLotto = lotto.numbers.filter(
    (n) => n < LOTTO.MIN_RANDOM_VALUE || n > LOTTO.MAX_RANDOM_VALUE,
  );

  expect(filteredLotto.length === 0);
});
