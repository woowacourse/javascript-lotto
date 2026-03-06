import { input } from "./input.js";
import { validateEmpty } from "../utils/validator.js";

export const inputPurchaseAmount = async () => {
  const userInput = await input("구입금액을 입력해주세요.");

  return validateEmpty(userInput);
};
export const inputWinningNumbers = async () => {
  const userInput = await input("당첨 번호를 입력해 주세요.");

  return validateEmpty(userInput);
};
export const inputBonusNumber = async () => {
  const userInput = await input("보너스 번호를 입력해 주세요.");

  return validateEmpty(userInput);
};
export const inputYesNo = async () => {
  const userInput = await input("다시 시작하시겠습니까? (y/n)");

  return validateEmpty(userInput);
};
