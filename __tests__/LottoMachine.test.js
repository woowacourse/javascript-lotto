import generateLotto, { getLottoNumber } from "../src/LottoMachine.js";
import { LOTTO } from "../src/constant/lotto.js";

describe("lotto machine", () => {
  test(`${LOTTO.LENGTH}개의 숫자로 이루어진 로또를 생성한다.`, () => {
    const lotto = generateLotto();

    expect(lotto.length).toBe(LOTTO.LENGTH);
  });

  test("생성된 로또는 오름차순으로 정렬된다.", () => {
    const lotto = generateLotto();

    expect(lotto).toEqual(lotto.sort((a, b) => a - b));
  });

  test(`생성된 로또의 숫자는 ${LOTTO.MIN_RANDOM_VALUE}부터 ${LOTTO.MAX_RANDOM_VALUE} 사이의 숫자다.`, () => {
    const numbers = Array.from({ length: 1_000 }, () => getLottoNumber());
    const isAllInRange = numbers.every(
      (number) =>
        number >= LOTTO.MIN_RANDOM_VALUE && number <= LOTTO.MAX_RANDOM_VALUE
    );

    expect(isAllInRange).toBe(true);
  });

  test("로또의 번호는 중복되지 않는다.", () => {
    const lotto = generateLotto();

    expect(new Set(lotto).size).toBe(LOTTO.LENGTH);
  });
});
