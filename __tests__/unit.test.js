import Lotto from "../src/domain/Lotto.js";
import Validator from "../src/domain/Validator.js";

test("로또 객체를 생성하면 로또 번호가 저장된다.", () => {
  const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

  expect(lotto.getLottoNumber()).toEqual([1, 2, 3, 4, 5, 6]);
});

test("로또 번호는 6자리이다.", () => {
  expect(() => {
    Validator.validateLottoNumberLength([1, 2, 3, 4, 5, 6, 7]);
  }).toThrow("[ERROR]");
});

test("로또 번호는 서로 중복되지 않는다.", () => {
  expect(() => {
    Validator.validateLottoNumberDuplicated([1, 2, 3, 4, 5, 5]);
  }).toThrow("[ERROR]");
});

test("로또 번호는 1~45 사이의 숫자여야 한다.", () => {
  expect(() => {
    Validator.validateLottoNumberRange([100, 2, 3, 4, 5, 6]);
  }).toThrow("[ERROR]");
});

test("보너스 번호는 당첨번호와 중복되지 않는다.", () => {
  expect(() => {
    Validator.validateBonusNumberDuplicated([1, 2, 3, 4, 5, 6], 2);
  }).toThrow("[ERROR]");
});

test("보너스 번호가 1~45 사이의 숫자가 아니라면 예외 처리", () => {
  expect(() => {
    Validator.validateBonusNumberRange(50);
  }).toThrow("[ERROR]");
});
