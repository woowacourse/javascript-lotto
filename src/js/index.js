import { ALERT_MESSAGE, JS_SELECTOR } from "./constants/index.js";
import { $, toDataAttributeSelector as toDAS } from "./utils/index.js";

const $cashButton = $(toDAS(JS_SELECTOR.CASH.BUTTON));
const $cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));

$cashButton.addEventListener("click", () => {
  const getAlertMessage = (userInputCash) => {
    if (userInputCash === "") {
      return ALERT_MESSAGE.ERROR.CASH_INPUT.NOT_A_NUMBER;
    }

    const cash = Number(userInputCash);

    if (cash < 0) {
      return ALERT_MESSAGE.ERROR.CASH_INPUT.NEGATIVE;
    }

    if (!Number.isInteger(cash)) {
      return ALERT_MESSAGE.ERROR.CASH_INPUT.DECIMAL;
    }

    return "";
  };

  const alertMessage = getAlertMessage($cashInput.value);

  if (alertMessage !== "") {
    alert(alertMessage);
    $cashInput.value = "";
    return;
  }

  const cash = Number($cashInput.value);
  const lottoCount = Math.floor(cash / 1000);

  // TO-DO: 구매한 로또 갯수만큼 아이콘 정보를 보여준다
});
