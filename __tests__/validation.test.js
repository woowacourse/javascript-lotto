const Validation = require("../src/Validation");
describe("사용자가 입력한 구매 금액에 대한 유효성 검사", () => {
  test.each([["a"], [""], ["%"]])(
    "구매 금액이 숫자가 아닌 경우 에러 발생 %#",
    (testCase) => {
      expect(() => {
        Validation.inputIsInteger(testCase);
      }).toThrow();
    }
  );

  test.each([[1], [8000], [-1]])(
    "구매 금액이 숫자인 경우 통과 %#",
    (testCase) => {
      expect(() => {
        Validation.inputIsInteger(testCase);
      }).not.toThrow();
    }
  );

  test.each([[1], [10001], [999]])(
    "구매 금액이 기준값으로 나누어 떨어지지 않는 경우 에러 발생 %#",
    (testCase) => {
      expect(() => {
        Validation.purchaseAmountDivideUnit(testCase);
      }).toThrow();
    }
  );
  test.each([[999], [555], [0]])(
    "구매 금액이 1매 이상 구입이 가능하지 않다면 오류 발생 %#",
    (testCase) => {
      expect(() => {
        Validation.purchaseAmountIsOverUnit(testCase);
      }).toThrow();
    }
  );
  test.each([[1000], [80000], [0]])(
    "구매 금액이 기준값으로 나누어 떨어지는 경우 통과 %#",
    (testCase) => {
      expect(() => {
        Validation.purchaseAmountDivideUnit(testCase);
      }).not.toThrow();
    }
  );
});

describe("사용자가 입력한 당첨 번호에 대한 유효성 검사", () => {
  test.each([[[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
    "당첨 번호가 6개가 아닌 경우 오류 발생 %#",
    (testCase) => {
      expect(() => {
        Validation.lottoNumberSize(testCase);
      }).toThrow();
    }
  );
  test.each([[[1, 2, 3, 4, 5, 5]], [[1, 2, 3, 4, 45, 45]]])(
    "당첨 번호 내 중복되는 번호가 있는 경우 오류 발생 %#",
    (testCase) => {
      expect(() => {
        Validation.isDuplicated(testCase);
      }).toThrow();
    }
  );

  test.each([[[1, 2, 3, 4, 5, 6]], [[1, 2, 3, 4, 5, 45]]])(
    "당첨 번호 내 중복되는 번호가 없는 경우 통과 %#",
    (testCase) => {
      expect(() => {
        Validation.isDuplicated(testCase);
      }).not.toThrow();
    }
  );

  test.each([[0], [46], [100]])(
    "복권번호가 범위에 해당하지 않는 경우 에러 발생 %#",
    (testCase) => {
      expect(() => {
        Validation.numberInRange(testCase);
      }).toThrow();
    }
  );

  test.each([[1], [45], [33]])(
    "복권번호가 범위에 해당하는 경우 통과%#",
    (testCase) => {
      expect(() => {
        Validation.numberInRange(testCase);
      }).not.toThrow();
    }
  );

  test.each([
    [[[1, 2, 3, 4, 5, 6], 0]],
    [[[1, 2, 3, 4, 5, 6], 46]],
    [[[1, 2, 3, 4, 5, 6], 100]],
  ])("보너스 번호가 범위에 해당하지 않는 경우 오류 발생 %#", (testCase) => {
    expect(() => {
      Validation.bonusNumber(testCase[0], testCase[1]);
    }).toThrow();
  });
  test.each([[[[1, 2, 3, 4, 5, 6], 1]], [[[1, 2, 3, 4, 5, 6], 6]]])(
    "보너스 번호가 복권번호와 중복되는 경우 오류 발생 %#",
    (testCase) => {
      expect(() => {
        Validation.bonusNumber(testCase[0], testCase[1]);
      }).toThrow();
    }
  );

  test.each([[[[2, 3, 4, 5, 6, 7], 1]], [[[1, 2, 3, 4, 5, 6], 45]]])(
    "보너스 번호가 범위에 해당하고 복권번호와 중복되지 않는 경우 %#",
    (testCase) => {
      expect(() => {
        Validation.bonusNumber(testCase[0], testCase[1]);
      }).not.toThrow();
    }
  );
});

describe("재시작 여부에 대한 사용자 응답이 유효한지 테스트", () => {
  test.each([["0"], [0], ["yx"]])(
    "y가 아니거나 n이 아닌 경우 오류 발생 %#",
    (testCase) => {
      expect(() => {
        Validation.restartCommand(testCase);
      }).toThrow();
    }
  );

  test.each([["n"], ["y"]])("y나 n인 경우 테스트 통과 %#", (testCase) => {
    expect(() => {
      Validation.restartCommand(testCase);
    }).not.toThrow();
  });
});
