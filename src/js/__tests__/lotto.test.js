<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Lotto from "../domains/Lotto.js";
import { LOTTO } from "../constants/constants.js";
import { isInRange, isDuplicated } from "../validations/utils.js";
<<<<<<< HEAD
=======
import Lotto from '../domains/Lotto.js';
import { LOTTO } from '../constants/constants.js';
import { isInRange, isDuplicated } from '../validations/utils.js';
>>>>>>> e3a0510 (feat: 로또 당첨 숫자 validate로직 추가)

let lotto;

class TestStrategy {
  constructor() {}
  pickNumbers() {
    return [1, 2, 3, 4, 5, 6];
  }
}

describe('로또 단위 테스트 ', () => {
  beforeEach(() => {
    lotto = new Lotto(new TestStrategy()).generate();
  });
  test('로또는 1부터 45번까지의 숫자들을 가진다.', () => {
    expect(isInRange(lotto.numbers, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)).toBe(
=======
// - [ ] 로또는 1부터 45번까지의 총 6개의 숫자를 가진다.
// - [ ] 로또의 각 숫자들은 중복되지 않는다.
=======
>>>>>>> 57f94ab (feat: 로또의 각 숫자들은 중복되지 않도록 구현)
import Lotto from "../domains/Lotto";

const LOTTO_MIN_NUMBER = 1;
const LOTTO_MAX_NUMBER = 45;
=======
import Lotto from "../domains/Lotto.js";
import { LOTTO } from "../constants/constants.js";
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
=======
import Lotto from '../domains/Lotto.js';
import { LOTTO } from '../constants/constants.js';
>>>>>>> a161b95 (feat: 로또 금액을 입력받아 저장하도록 구현)
=======
import Lotto from "../domains/Lotto.js";
import { LOTTO } from "../constants/constants.js";
>>>>>>> d542d56 (test: lotto 리팩터링에 따른 테스트코드 변경)

function isInRange(arr, min, max) {
  return arr.every((item) => item >= min && item <= max);
}

function isDuplicated(arr) {
  const set = new Set(arr);
  return set.size === arr.length;
}
=======
>>>>>>> e26881d (refactor: 테스트코드내의 함수들 파일분리)

describe("로또 단위 테스트 ", () => {
  const lotto = new Lotto();
  lotto.pickNumbers();

<<<<<<< HEAD
<<<<<<< HEAD
  test("로또는 1부터 45번까지의 숫자들을 가진다.", () => {
<<<<<<< HEAD
    expect(isInRange(lotto.numbers, LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER)).toBe(
>>>>>>> f98c3df (feat: 로또 숫자 생성 함수 구현)
=======
=======
  test('로또는 1부터 45번까지의 숫자들을 가진다.', () => {
>>>>>>> a161b95 (feat: 로또 금액을 입력받아 저장하도록 구현)
=======
  test("로또는 1부터 45번까지의 숫자들을 가진다.", () => {
>>>>>>> d542d56 (test: lotto 리팩터링에 따른 테스트코드 변경)
    expect(isInRange(lotto.numbers, LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER)).toBe(
>>>>>>> 0d4f4f9 (refactor: 로또 관련 상수 결합)
      true
    );
  });

  test('로또는 총 6개의 숫자를 가진다.', () => {
    expect(lotto.numbers).toHaveLength(6);
  });
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 57f94ab (feat: 로또의 각 숫자들은 중복되지 않도록 구현)

  test('로또의 각 숫자들은 중복되지 않는다.', () => {
    expect(!isDuplicated(lotto.numbers)).toBe(true);
  });
<<<<<<< HEAD
=======
>>>>>>> f98c3df (feat: 로또 숫자 생성 함수 구현)
=======
>>>>>>> 57f94ab (feat: 로또의 각 숫자들은 중복되지 않도록 구현)
});
