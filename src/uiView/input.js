import retryUntilValid from "../utils/retryUntilValidUI.js";
import validatePrice from "../validations/validatePrice.js";

export const getLottoPrice = () => {
  return retryUntilValid(
    document.querySelector(".purchase input").value,
    validatePrice
  );
};
