import { validator } from "../src/domain/validator";
const {
  checkPurchaseAmount,
  checkInteger,
  checkDuplicates,
  checkLottoNumbersBetween1And45,
  checkListLengthIsSix,
  checkBonusNumberDuplicate,
  checkBonusNumberBetween1And45,
  checkYOrN,
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

test("입력받은 금액이 1,000원 미만이거나 1,000원 단위가 아닌 경우 에러 메시지를 출력한다.", () => {
  const purchaseAmountList = [
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

  throwErrorIfInvalid(purchaseAmountList, checkPurchaseAmount);
});

test("입력받은 금액이 1,000원 이상이고 1,000원 단위일 경우 에러 메시지를 출력하지 않는다.", () => {
  const purchaseAmountList = [1000, 5000, 50000, 1500000, 25000];

  throwNoErrorIfValid(purchaseAmountList, checkPurchaseAmount);
});

test("입력받은 금액이 정수가 아닐 경우 에러 메시지를 출력한다.", () => {
  const notIntegerList = ["천원", "5000.0", " ", "^^", "5,000", "", "2e3", -500];

  throwErrorIfInvalid(notIntegerList, checkInteger);
});

test("입력받은 금액이 정수일 경우 에러 메시지를 출력하지 않는다.", () => {
  const integerList = [1000, 5000, 50000, 1500000, 25000, 100, 1];

  throwNoErrorIfValid(integerList, checkInteger);
});

test("로또 당첨 번호에 중복이 있을 경우 에러 메시지를 출력한다.", () => {
  const winningLottoNumbers = [
    [1, 1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 2],
  ];

  throwErrorIfInvalid(winningLottoNumbers, checkDuplicates);
});

test("로또 당첨 번호에 중복이 없을 경우 에러 메시지를 출력하지 않는다.", () => {
  const winningLottoNumbers = [
    [1, 6, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6],
  ];

  throwNoErrorIfValid(winningLottoNumbers, checkDuplicates);
});

test("로또 당첨 번호중 1 ~ 45 사이가 아닌 숫자가 있을 경우 에러 메시지를 출력한다.", () => {
  const winningLottoNumbers = [
    [0, 1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 46],
  ];

  throwErrorIfInvalid(winningLottoNumbers, checkLottoNumbersBetween1And45);
});

test("로또 당첨 번호 중 1 ~ 45 사이가 아닌 숫자가 없을 경우 에러 메시지를 출력하지 않는다.", () => {
  const winningLottoNumbers = [
    [1, 6, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6],
  ];

  throwNoErrorIfValid(winningLottoNumbers, checkLottoNumbersBetween1And45);
});

test("로또 당첨 번호가 6개가 아닐 경우 에러 메시지를 출력한다.", () => {
  const winningLottoNumbers = [
    [1, 2],
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ];

  throwErrorIfInvalid(winningLottoNumbers, checkListLengthIsSix);
});

test("로또 당첨 번호가 6개일 경우 에러 메시지를 출력하지 않는다.", () => {
  const winningLottoNumbers = [
    [1, 6, 2, 3, 4, 5],
    [1, 2, 3, 4, 5, 6],
  ];

  throwNoErrorIfValid(winningLottoNumbers, checkListLengthIsSix);
});

test("보너스 번호가 로또 당첨 번호와 중복될 경우 에러 메시지를 출력한다.", () => {
  const bonusNumber = 6;
  const winningLottoNumbers = [1, 2, 3, 4, 5, 6];

  expect(() => checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers)).toThrow("[ 에러 ]");
});

test("보너스 번호가 로또 당첨 번호와 중복되지 않을 경우 에러 메시지를 출력하지 않는다.", () => {
  const bonusNumber = 7;
  const winningLottoNumbers = [1, 2, 3, 4, 5, 6];

  expect(() => checkBonusNumberDuplicate(bonusNumber, winningLottoNumbers)).not.toThrow("[ 에러 ]");
});

test("보너스 번호가 1 ~ 45 사이가 아닌 경우 에러 메시지를 출력한다.", () => {
  const bonusNumberList = [0, 46];

  throwErrorIfInvalid(bonusNumberList, checkBonusNumberBetween1And45);
});

test("보너스 번호가 1 ~ 45 사이일 경우 에러 메시지를 출력하지 않는다.", () => {
  const bonusNumberList = [1, 45];

  throwNoErrorIfValid(bonusNumberList, checkBonusNumberBetween1And45);
});

test("입력받은 문자가 대, 소문자 Y/y 또는 N/n이 아닌 경우 에러 메시지를 출력한다.", () => {
  const response = ["T", "YY", "NN", "^^", 1, " ", ""];

  throwErrorIfInvalid(response, checkYOrN);
});

test("입력받은 문자가 대, 소문자 Y/y 또는 N/n일 경우 에러 메시지를 출력하지 않는다.", () => {
  const response = ["Y", "y", "N", "n"];

  throwNoErrorIfValid(response, checkYOrN);
});
