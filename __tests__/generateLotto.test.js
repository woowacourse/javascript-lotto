import { LOTTO } from "../src/constant/lotto.js";
import generateLotto from "../src/LottoMachine.js";

test(`${LOTTO.MIN_RANDOM_VALUE}~${LOTTO.MAX_RANDOM_VALUE} 사이의 ${LOTTO.LENGTH}개의 숫자로 이루어진 로또를 생성한다.`, () => {
  const lotto = generateLotto();

  expect(lotto.length).toBe(LOTTO.LENGTH);
});
