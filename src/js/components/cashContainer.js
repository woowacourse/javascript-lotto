import { ACTION_TYPE, ALERT_MESSAGE, JS_SELECTOR } from "../constants/index.js";
import { $, toDataAttributeSelector as toDAS } from "../utils/index.js";
import store from "../store.js";
import Lotto from "../models/Lotto.js";
import { generateLottoNumbers } from "../utils/index.js";

const $cashContainer = $(toDAS(JS_SELECTOR.CASH.CONTAINER));
const $cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));

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

$cashContainer.addEventListener("submit", (event) => {
  event.preventDefault();

  const alertMessage = getAlertMessage($cashInput.value);

  if (alertMessage !== "") {
    alert(alertMessage);
    $cashInput.value = "";
    return;
  }

  const cash = Number($cashInput.value);
  const lottoCount = Math.floor(cash / 1000);

  const lottos = [...Array(lottoCount)].map(
    () => new Lotto(generateLottoNumbers())
  );

  store.dispatch({
    type: ACTION_TYPE.LOTTOS,
    payload: lottos,
  });
});
