import { ERROR_MESSAGES, TERMS } from "../src/utils/constants.js";
import InputView from "../src/view/InputView.js";
import { InputValidator } from "../src/utils/InputValidator.js";

describe("입력 기능 test", () => {
  afterAll(() => {
    InputView.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('사용자가 8000을 입력하면 "8000"을 반환해야 한다.', async () => {
    const readSpy = jest
      .spyOn(InputView, "readPurchaseAmount")
      .mockResolvedValueOnce("8000");

    const result = await InputView.readPurchaseAmount(
      "구입금액을 입력해 주세요.\n"
    );

    expect(result).toBe("8000");
    expect(readSpy).toHaveBeenCalledWith("구입금액을 입력해 주세요.\n");
  });
});

describe("구입 금액 입력값 검증 test", () => {
  test.each([
    ["공백이 입력된 경우", "  ", ERROR_MESSAGES.BLANK_INPUT],
    [
      "숫자가 아닌 문자가 포함된 경우",
      "5000j",
      ERROR_MESSAGES.PURCHASE_AMOUNT_TYPE,
    ],
    ["음수인 경우", "-1000", ERROR_MESSAGES.PURCHASE_AMOUNT_NEGATIVE],
    [
      "1,000원으로 나누어 떨어지지 않는 경우",
      "900",
      ERROR_MESSAGES.PURCHASE_AMOUNT_UNIT,
    ],
  ])("%s", (_, input, expectedError) => {
    expect(() =>
      InputValidator.runValidate(TERMS.PURCHASE_AMOUNT, input)
    ).toThrow(expectedError);
  });
});

describe("당첨 번호 입력값 검증 test", () => {
  test.each([
    ["숫자가 아닌 경우", "1,2,3,4,d,6", ERROR_MESSAGES.WINNING_NUMBER_TYPE],
    [", 외의 구분자인 경우", "1,2,3,4,5;6", ERROR_MESSAGES.WINNING_NUMBER_TYPE],
    [
      "당첨 번호 개수가 6개가 아닌 경우",
      "1,2,3,4,5",
      ERROR_MESSAGES.WINNING_NUMBER_COUNT,
    ],
    [
      "중복된 번호가 포함된 경우",
      "1,2,3,4,5,5",
      ERROR_MESSAGES.WINNING_NUMBER_DUPLICATE,
    ],
    [
      "1~45 범위를 벗어나는 경우",
      "1,2,3,4,5,50",
      ERROR_MESSAGES.WINNING_NUMBER_RANGE,
    ],
  ])("%s", (_, input, expectedError) => {
    expect(() =>
      InputValidator.runValidate(TERMS.WINNING_NUMBERS, input)
    ).toThrow(expectedError);
  });
});

test("보너스 번호 입력값 검증 test", () => {
  expect(() => InputValidator.runValidate(TERMS.BONUS_NUMBER, "d")).toThrow(
    ERROR_MESSAGES.BONUS_NUMBER_TYPE
  );
});
