// - [ ] 로또는 1부터 45번까지의 총 6개의 숫자를 가진다.
// - [ ] 로또의 각 숫자들은 중복되지 않는다.
import Lotto from "../domains/Lotto";

const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

function isInRange(arr, min, max) {
  return arr.every((item) => item >= min && item <= max);
}

describe("로또 단위 테스트 ", () => {
  const lotto = new Lotto();
  lotto.generateNumbers(lotto.generateRandomNumber);

  test("로또는 1부터 45번까지의 숫자들을 가진다.", () => {
    expect(isInRange(lotto.numbers, LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER)).toBe(
      true
    );
  });

  test("로또는 총 6개의 숫자를 가진다.", () => {
    expect(lotto.numbers).toHaveLength(6);
  });
});
