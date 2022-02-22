<<<<<<< HEAD
<<<<<<< HEAD
import Lotto from "../domains/Lotto.js";
import { LOTTO } from "../constants/constants.js";
import { isInRange, isDuplicated } from "../validations/utils.js";

describe("로또 단위 테스트 ", () => {
  const lotto = new Lotto();
  lotto.pickNumbers();

  test("로또는 1부터 45번까지의 숫자들을 가진다.", () => {
    expect(isInRange(lotto.numbers, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)).toBe(
=======
// - [ ] 로또는 1부터 45번까지의 총 6개의 숫자를 가진다.
// - [ ] 로또의 각 숫자들은 중복되지 않는다.
=======
>>>>>>> 57f94ab (feat: 로또의 각 숫자들은 중복되지 않도록 구현)
import Lotto from "../domains/Lotto";

const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;

function isInRange(arr, min, max) {
  return arr.every((item) => item >= min && item <= max);
}

function isDuplicated(arr) {
  const set = new Set(arr);
  return set.size === arr.length;
}

describe("로또 단위 테스트 ", () => {
  const lotto = new Lotto();
  lotto.numbers = lotto.generateNumbers(lotto.generateRandomNumber);

  test("로또는 1부터 45번까지의 숫자들을 가진다.", () => {
    expect(isInRange(lotto.numbers, LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER)).toBe(
>>>>>>> f98c3df (feat: 로또 숫자 생성 함수 구현)
      true
    );
  });

  test("로또는 총 6개의 숫자를 가진다.", () => {
    expect(lotto.numbers).toHaveLength(6);
  });
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 57f94ab (feat: 로또의 각 숫자들은 중복되지 않도록 구현)

  test("로또의 각 숫자들은 중복되지 않는다.", () => {
    expect(isDuplicated(lotto.numbers)).toBe(true);
  });
<<<<<<< HEAD
=======
>>>>>>> f98c3df (feat: 로또 숫자 생성 함수 구현)
=======
>>>>>>> 57f94ab (feat: 로또의 각 숫자들은 중복되지 않도록 구현)
});
