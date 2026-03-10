import inputloop from "../src/utils/InputLoop.js";
import InputView from "../src/view/InputView.js";
import { ERROR_MESSAGE } from "../src/constants/message.js";

describe("재입력 테스트", () => {
  test("구매 금액 입력시 입력 받은 값이 에러가 날 경우 에러 메시지를 출력하고 다시 입력을 받는다", async () => {
    const inputPriceSpy = jest.spyOn(InputView, "inputPrice");

    inputPriceSpy
      .mockRejectedValueOnce(new Error(ERROR_MESSAGE.INVALID_PURCHASE_UNIT))
      .mockRejectedValueOnce(new Error(ERROR_MESSAGE.INVALID_PURCHASE_UNIT))
      .mockResolvedValueOnce("8000");

    const result = await inputloop(() => InputView.inputPrice());

    expect(inputPriceSpy).toHaveBeenCalledTimes(3);
    expect(result).toBe("8000");
  });

  test("당첨 번호 입력시 입력 받은 값이 에러가 날 경우 에러 메시지를 출력하고 다시 입력을 받는다", async () => {
    const inputWinningNumsSpy = jest.spyOn(InputView, "inputWinningNums");

    inputWinningNumsSpy
      .mockRejectedValueOnce(new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS))
      .mockResolvedValueOnce([1, 2, 3, 4, 5, 6]);

    const result = await inputloop(() => InputView.inputWinningNums());

    expect(inputWinningNumsSpy).toHaveBeenCalledTimes(2);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("보너스 번호 입력시 입력 받은 값이 에러가 날 경우 에러 메시지를 출력하고 다시 입력을 받는다", async () => {
    const inputBonusSpy = jest.spyOn(InputView, "inputBonusNum");

    inputBonusSpy
      .mockRejectedValueOnce(new Error(ERROR_MESSAGE.INVALID_LOTTO_NUM_RANGE))
      .mockRejectedValueOnce(new Error(ERROR_MESSAGE.INVALID_LOTTO_NUM_RANGE))
      .mockRejectedValueOnce(new Error(ERROR_MESSAGE.INVALID_LOTTO_NUM_RANGE))
      .mockResolvedValueOnce(9);

    const result = await inputloop(() => InputView.inputBonusNum());

    expect(inputBonusSpy).toHaveBeenCalledTimes(4);
    expect(result).toEqual(9);
  });
});
