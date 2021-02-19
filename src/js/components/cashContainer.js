import {
  ACTION_TYPE,
  ALERT_MESSAGE,
  JS_SELECTOR,
  MONEY,
} from "../constants/index.js";
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

  if (cash < MONEY.LOTTO_PRICE) {
    return ALERT_MESSAGE.ERROR.CASH_INPUT.UNDER_LOTTO_PRICE;
  }

  return "";
};

$cashContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  const alertMessage = getAlertMessage($cashInput.value);

  if (alertMessage !== "") {
    alert(alertMessage);
    $cashInput.clear();
    return;
  }

  const cash = Number($cashInput.value);
  const lottoCount = Math.floor(cash / MONEY.LOTTO_PRICE);
  $cashInput.clear();

  const lottos = [...Array(lottoCount)].map(
    () => new Lotto(generateLottoNumbers())
  );

  store.dispatch({
    type: ACTION_TYPE.LOTTOS,
    payload: lottos,
  });
});
