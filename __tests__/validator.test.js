import {
  checkPurchaseAmount,
  checkInteger,
  checkDuplicates,
  checkBonusNumberBetween1And45,
  checkListLengthIsSix,
  checkBonusNumberDuplicate,
  checkLottoNumbersBetween1And45,
  checkYOrN,
} from "../src/step1-index";

test.each([
  [1000, true],
  [5000, true],
  [50000, true],
  [3001, false],
  [0, false],
  [-5000, false],
])(
  "입력받은 금액(%i)이 1,000원 이상이고 1,000원 단위가 아닌 경우 에러를 반환한다.",
  (purchaseAmount, expected) => {
    expected
      ? expect(() => checkPurchaseAmount(purchaseAmount)).not.toThrow()
      : expect(() => checkPurchaseAmount(purchaseAmount)).toThrow();
  }
);

test.each([
  ["천원", false],
  ["5000.0", false],
  [" ", false],
  ["^^", false],
  ["5,000", false],
  ["", false],
  ["2e3", false],
  ["500", true],
])("입력받은 금액(%i)이 정수가 아닐 경우 에러를 반환한다.", (purchaseAmount, expected) => {
  expected
    ? expect(() => checkInteger(purchaseAmount)).not.toThrow()
    : expect(() => checkInteger(purchaseAmount)).toThrow();
});

test.each([
  [[1, 1, 2, 3, 4, 5], false],
  [[1, 2, 3, 4, 5, 2], false],
  [[1, 6, 2, 3, 4, 5], true],
])("로또 번호(%p)에 중복이 있을 경우 에러를 반환한다.", (winningLottoNumbers, expected) => {
  expected
    ? expect(() => checkDuplicates(winningLottoNumbers)).not.toThrow()
    : expect(() => checkDuplicates(winningLottoNumbers)).toThrow();
});

test.each([
  [[1, 1, 2, 3, 4, 46], false],
  [[0, 2, 3, 4, 5, 2], false],
  [[1, 6, 2, 3, 4, 5], true],
])(
  "로또 번호(%p) 중 1 ~ 45 사이가 아닌 숫자가 있을 경우 에러를 반환한다.",
  (winningLottoNumbers, expected) => {
    expected
      ? expect(() => checkLottoNumbersBetween1And45(winningLottoNumbers)).not.toThrow()
      : expect(() => checkLottoNumbersBetween1And45(winningLottoNumbers)).toThrow();
  }
);

test.each([
  [[1, 2, 3, 4, 5], false],
  [[1, 2, 3, 4, 5, 20, 30], false],
  [[1, 6, 2, 3, 4, 5], true],
])("로또 번호(%p)가 6개가 아닐 경우 에러를 반환한다.", (winningLottoNumbers, expected) => {
  expected
    ? expect(() => checkListLengthIsSix(winningLottoNumbers)).not.toThrow()
    : expect(() => checkListLengthIsSix(winningLottoNumbers)).toThrow();
});

test.each([
  [6, [1, 2, 3, 4, 5, 6], false],
  [7, [1, 2, 3, 4, 5, 6], true],
])(
  "보너스 번호(%i)가 로또 당첨 번호(%p)와 중복되면 에러를 반환한다.",
  (bonusNumber, winningLottoNumbers, expected) => {
    expected
      ? expect(() => checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers)).not.toThrow()
      : expect(() => checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers)).toThrow();
  }
);

test.each([
  [0, false],
  [46, false],
  [1, true],
  [45, true],
])("보너스 번호(%i)가 1 ~ 45 사이가 아닌 경우 에러를 반환한다.", (bonusNumber, expected) => {
  expected
    ? expect(() => checkBonusNumberBetween1And45(bonusNumber)).not.toThrow()
    : expect(() => checkBonusNumberBetween1And45(bonusNumber)).toThrow();
});

test.each([
  ["T", false],
  ["YY", false],
  ["NN", false],
  ["", false],
  ["^^", false],
  ["1", false],
  [" ", false],
  ["Y", true],
  ["N", true],
  ["y", true],
  ["n", true],
])("문자(%s)가 대, 소문자 Y/y 또는 N/n 아닌 경우 에러를 반환한다.", (yOrN, expected) => {
  expected ? expect(() => checkYOrN(yOrN)).not.toThrow() : expect(() => checkYOrN(yOrN)).toThrow();
});
