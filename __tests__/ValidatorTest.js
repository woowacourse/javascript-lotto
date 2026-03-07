import {
  validateBonusNumber,
  validateCount,
  validateEmpty,
  validateLottoNumbers,
  validateNoDuplicate,
  validateNumber,
  validatePositive,
  validatePurchaseAmount,
  validateRange,
  validateRestartInput,
  validateUnit,
  validateYesNo,
} from "../src/utils/validator.js";

describe("유효성 검증 테스트", () => {
  describe("공통 검증", () => {
    describe("빈 입력값", () => {
      test.each([
        { input: "", desc: "빈 문자열" },
        { input: " ", desc: "공백" },
      ])("$desc -> 에러", ({ input }) => {
        expect(() => validateEmpty(input)).toThrow("[ERROR]");
      });
    });

    describe("숫자 검증", () => {
      test.each([
        { input: NaN, desc: "NaN" },
        { input: Infinity, desc: "Infinity" },
      ])("$desc -> 에러", ({ input }) => {
        expect(() => validateNumber(input)).toThrow("[ERROR]");
      });

      test("유효한 숫자 -> 통과", () => {
        expect(() => validateNumber(1000)).not.toThrow();
      });
    });

    describe("1~45 범위", () => {
      test.each([
        { input: 0, desc: "0" },
        { input: 46, desc: "46" },
        { input: -1, desc: "-1" },
      ])("$desc -> 에러", ({ input }) => {
        expect(() => validateRange(input)).toThrow("[ERROR]");
      });

      test.each([
        { input: 1, desc: "1" },
        { input: 45, desc: "45" },
      ])("$desc -> 통과", ({ input }) => {
        expect(() => validateRange(input)).not.toThrow();
      });
    });

    describe("중복값", () => {
      test("[1,2,3,4,5,5] 중복 있음 -> 에러", () => {
        expect(() => validateNoDuplicate([1, 2, 3, 4, 5, 5])).toThrow(
          "[ERROR]",
        );
      });

      test("[1,2,3,4,5,6] 중복 없음 -> 통과", () => {
        expect(() => validateNoDuplicate([1, 2, 3, 4, 5, 6])).not.toThrow();
      });
    });

    describe("6개 숫자", () => {
      test.each([
        { input: [1, 2, 3, 4, 5], desc: "5개" },
        { input: [1, 2, 3, 4, 5, 6, 7], desc: "7개" },
      ])("$desc -> 에러", ({ input }) => {
        expect(() => validateCount(input)).toThrow("[ERROR]");
      });

      test("6개 -> 통과", () => {
        expect(() => validateCount([1, 2, 3, 4, 5, 6])).not.toThrow();
      });
    });

    describe("음수 값", () => {
      test("음수 -> 에러", () => {
        expect(() => validatePositive(-1000)).toThrow("[ERROR]");
      });

      test("양수 -> 통과", () => {
        expect(() => validatePositive(1000)).not.toThrow();
      });
    });

    describe("1000 단위", () => {
      test.each([
        { input: 1500, desc: "1500" },
        { input: 999, desc: "999" },
      ])("$desc -> 에러", ({ input }) => {
        expect(() => validateUnit(input)).toThrow("[ERROR]");
      });

      test("1000 단위 -> 통과", () => {
        expect(() => validateUnit(1000)).not.toThrow();
      });
    });

    describe("y/n 입력", () => {
      test("y, n이 아닌 값 입력 -> 에러", () => {
        expect(() => validateYesNo("a")).toThrow("[ERROR]");
      });

      test.each([
        { input: "y", desc: "y" },
        { input: "n", desc: "n" },
      ])("$desc -> 통과", ({ input }) => {
        expect(() => validateYesNo(input)).not.toThrow();
      });
    });
  });

  describe("구입 금액 검증", () => {
    test.each([
      { input: NaN, desc: "숫자가 아닌 경우" },
      { input: -1000, desc: "음수인 경우" },
      { input: 1500, desc: "1000 단위가 아닌 경우" },
    ])("$desc -> 에러", ({ input }) => {
      expect(() => validatePurchaseAmount(input)).toThrow("[ERROR]");
    });

    test("8000 -> 통과", () => {
      expect(() => validatePurchaseAmount(8000)).not.toThrow();
    });
  });

  describe("로또 번호 검증", () => {
    test.each([
      { input: [1, 2, 3, 4, 5], desc: "6개 미만" },
      { input: [1, 2, 3, 4, 5, 46], desc: "범위 초과" },
      { input: [1, 2, 3, 4, 5, 5], desc: "중복 있음" },
    ])("$desc -> 에러", ({ input }) => {
      expect(() => validateLottoNumbers(input)).toThrow("[ERROR]");
    });

    test("[1,2,3,4,5,6] -> 통과", () => {
      expect(() => validateLottoNumbers([1, 2, 3, 4, 5, 6])).not.toThrow();
    });
  });

  describe("보너스 번호 검증", () => {
    test.each([
      {
        input: NaN,
        winningNumbers: [1, 2, 3, 4, 5, 6],
        desc: "숫자가 아닌 경우",
      },
      { input: 46, winningNumbers: [1, 2, 3, 4, 5, 6], desc: "범위 초과" },
      {
        input: 6,
        winningNumbers: [1, 2, 3, 4, 5, 6],
        desc: "당첨 번호와 중복",
      },
    ])("$desc -> 에러", ({ input, winningNumbers }) => {
      expect(() => validateBonusNumber(input, winningNumbers)).toThrow(
        "[ERROR]",
      );
    });

    test("7, [1,2,3,4,5,6] -> 통과", () => {
      expect(() => validateBonusNumber(7, [1, 2, 3, 4, 5, 6])).not.toThrow();
    });
  });

  describe("재시작/종료 여부 검증", () => {
    test("y,n이 아닌 값 입력 -> 에러", () => {
      expect(() => validateRestartInput("a")).toThrow("[ERROR]");
    });

    test.each([
      { input: "y", desc: "y" },
      { input: "n", desc: "n" },
    ])("$desc -> 통과", ({ input }) => {
      expect(() => validateRestartInput(input)).not.toThrow();
    });
  });
});
