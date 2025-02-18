import retryUntilValid from "../../../javascript-racingcar/src/utils/retryUntilValid.js";
import validatePrice from "../domain/validatePrice.js";

export const getLottoPrice = () =>
  retryUntilValid("구입금액을 입력해 주세요.", validatePrice);
