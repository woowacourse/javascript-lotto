import { validator } from "../src/validator";
const {
  checkPurchaseAmount,
  checkInteger,
  checkDuplicates,
  checkLottoNumbersBetween1And45,
  checkListLengthIsSix,
  checkBonusNumberDuplicate,
  checkBonusNumberBetween1And45,
  checkRestartOrQuitCommend,
} = validator;

const throwErrorIfInvalid = (values, validator) => {
  values.forEach((value) => {
    expect(() => {
      validator(value);
    }).toThrow("[ 에러 ]");
  });
};

const throwNoErrorIfValid = (values, validator) => {
  values.forEach((value) => {
    expect(() => {
      validator(value);
    }).not.toThrow("[ 에러 ]");
  });
};

test("입력받은 금액은 1,000원 이상 & 1,000원 단위여야 한다.", () => {
  const invalidPurchaseAmountList = [
    "1001",
    1001,
    -1000,
    0,
    10,
    100,
    99999,
    0.2,
    "0.1",
    "-2000",
    "천원",
    "^^",
    "",
    " ",
  ];
  const validPurchaseAmountList = [1000, 5000, 50000, 1500000, 25000];

  throwErrorIfInvalid(invalidPurchaseAmountList, checkPurchaseAmount);
  throwNoErrorIfValid(validPurchaseAmountList, checkPurchaseAmount);
});

test("입력받은 금액은 정수여야 한다.", () => {
  const invalidNotIntegerList = ["천원", "5000.0", " ", "^^", "5,000", "", "2e3", -500];
  const validIntegerList = [1000, 5000, 50000, 1500000, 25000, 100, 1];

  throwErrorIfInvalid(invalidNotIntegerList, checkInteger);
  throwNoErrorIfValid(validIntegerList, checkInteger);
});

test("로또 당첨 번호는 중복이 없어야 한다.", () => {
  const invalidWinningLottoNumbers = [
    [1, 1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 2],
  ];
  const validWinningLottoNumbers = [
    [1, 6, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6],
  ];

  throwErrorIfInvalid(invalidWinningLottoNumbers, checkDuplicates);
  throwNoErrorIfValid(validWinningLottoNumbers, checkDuplicates);
});

test("로또 당첨 번호들은 1 ~ 45 사이의 숫자여야 한다.", () => {
  const invalidWinningLottoNumbers = [
    [0, 1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 46],
  ];
  const validWinningLottoNumbers = [
    [1, 6, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6],
  ];

  throwErrorIfInvalid(invalidWinningLottoNumbers, checkLottoNumbersBetween1And45);
  throwNoErrorIfValid(validWinningLottoNumbers, checkLottoNumbersBetween1And45);
});

test("로또 당첨 번호는 6개여야 한다.", () => {
  const invalidWinningLottoNumbers = [
    [1, 2],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ];
  const validWinningLottoNumbers = [
    [1, 6, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6],
  ];

  throwErrorIfInvalid(invalidWinningLottoNumbers, checkListLengthIsSix);
  throwNoErrorIfValid(validWinningLottoNumbers, checkListLengthIsSix);
});

test("보너스 번호와 로또 당첨 번호는 중복되지 않아야 한다.", () => {
  const invalidWinningLottoNumbers = [[1, 2, 3, 4, 5, 6], 6];
  const validWinningLottoNumbers = [[1, 2, 3, 4, 5, 6], 7];

  expect(() =>
    checkBonusNumberDuplicate(invalidWinningLottoNumbers[1], invalidWinningLottoNumbers[0])
  ).toThrow("[ 에러 ]");
  expect(() =>
    checkBonusNumberDuplicate(validWinningLottoNumbers[1], validWinningLottoNumbers[0])
  ).not.toThrow("[ 에러 ]");
});

test("보너스 번호는 1 ~ 45 사이의 숫자여야 한다.", () => {
  const invalidBonusNumberList = [0, 46];
  const validBonusNumberList = [1, 45];

  throwErrorIfInvalid(invalidBonusNumberList, checkBonusNumberBetween1And45);
  throwNoErrorIfValid(validBonusNumberList, checkBonusNumberBetween1And45);
});

test("입력받은 문자는 대, 소문자 Y/y 또는 N/n이어야 한다.", () => {
  const invalidCommend = ["T", "YY", "NN", "^^", 1, " ", ""];
  const validCommend = ["Y", "y", "N", "n"];

  throwErrorIfInvalid(invalidCommend, checkRestartOrQuitCommend);
  throwNoErrorIfValid(validCommend, checkRestartOrQuitCommend);
});
