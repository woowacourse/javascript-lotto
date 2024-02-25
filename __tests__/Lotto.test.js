import Lotto from "../src/step1/domains/Lotto";

const runInvalidLottoInputException = (
  invalidInput,
  errorMessage = "[ERROR]"
) => {
  expect(() => {
    new Lotto(invalidInput);
  }).toThrow(errorMessage);
};
describe("로또 도메인 테스트", () => {
  describe("유효성 테스트", () => {
    test("공백으로 로또를 생성하면 예외를 발생시킨다", () => {
      const INVALID_INPUT = "";

      runInvalidLottoInputException(INVALID_INPUT);
    });

    test("문자열로 로또를 생성하면 예외를 발생시킨다", () => {
      const INVALID_INPUT = "harry";

      runInvalidLottoInputException(INVALID_INPUT);
    });

    test("5개의 숫자 배열로 로또를 생성하면 예외를 발생시킨다", () => {
      const INVALID_INPUT = [1, 2, 3, 4, 5];

      runInvalidLottoInputException(INVALID_INPUT);
    });

    test("7개의 숫자 배열로 로또를 생성하면 예외를 발생시킨다", () => {
      const INVALID_INPUT = [1, 2, 3, 4, 5, 6, 7];

      runInvalidLottoInputException(INVALID_INPUT);
    });

    test("중복된 숫자가 담긴 배열로 로또를 생성하면 예외를 발생시킨다", () => {
      const INVALID_INPUT = [1, 2, 3, 4, 5, 5];

      runInvalidLottoInputException(INVALID_INPUT);
    });

    test("1~45 사이의 수가 아닌 숫자가 포함된 배열로 로또를 생성하면 예외를 발생시킨다", () => {
      const INVALID_INPUT = [1, 2, 3, 4, 5, 46];

      runInvalidLottoInputException(INVALID_INPUT);
    });
  });
  describe("기능 테스트", () => {
    test("1~45 사이의 중복되지 않는 6개 숫자가 담긴 배열로 로또를 생성할 수 있다.", () => {
      const VALID_INPUT = [1, 2, 3, 4, 5, 6];
      const lotto = new Lotto(VALID_INPUT);

      expect(lotto.getNumbers()).toEqual(VALID_INPUT);
    });

    const LOTTOS = [
      {
        numbers: [1, 7, 8, 9, 10, 11],
        expectedInfo: { matchedCount: 1, hasBonusNumber: true },
      },
      {
        numbers: [1, 2, 8, 9, 10, 11],
        expectedInfo: { matchedCount: 2, hasBonusNumber: false },
      },
      {
        numbers: [1, 2, 3, 9, 10, 11],
        expectedInfo: { matchedCount: 3, hasBonusNumber: false },
      },
      {
        numbers: [1, 2, 3, 4, 10, 11],
        expectedInfo: { matchedCount: 4, hasBonusNumber: false },
      },
      {
        numbers: [1, 2, 3, 4, 5, 11],
        expectedInfo: { matchedCount: 5, hasBonusNumber: false },
      },
      {
        numbers: [1, 2, 3, 4, 5, 6],
        expectedInfo: { matchedCount: 6, hasBonusNumber: false },
      },
      {
        numbers: [1, 2, 3, 4, 5, 7],
        expectedInfo: { matchedCount: 5, hasBonusNumber: true },
      },
    ];

    test.each(LOTTOS)(
      "구매한 로또 번호가 $numbers, 당첨 번호가 [1,2,3,4,5,6], 보너스 넘버는 7일 때, 비교 결과 (일치 갯수는 $expectedInfo.matchedCount 보너스 넘버 포함 여부는 $expectedInfo.hasBonusNumber)",
      ({ numbers, expectedInfo }) => {
        const WINNING_NUMBER = [1, 2, 3, 4, 5, 6];
        const BONUS_NUMBER = 7;
        const lotto = new Lotto(numbers);

        const matchedNumber = lotto.getMatchedInfo(
          WINNING_NUMBER,
          BONUS_NUMBER
        );

        expect(matchedNumber).toEqual(expectedInfo);
      }
    );
  });
});
