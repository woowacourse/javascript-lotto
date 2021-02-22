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

const validate = (userInputCash) => {
  if (userInputCash === "") {
    throw Error(ALERT_MESSAGE.ERROR.CASH_INPUT.NOT_A_NUMBER);
  }

  if (Number(userInputCash) < MONEY.LOTTO_PRICE) {
    throw Error(ALERT_MESSAGE.ERROR.CASH_INPUT.UNDER_LOTTO_PRICE);
  }
};

const createLottos = (cash) => {
  const lottoCount = Math.floor(cash / MONEY.LOTTO_PRICE);

  return [...Array(lottoCount)].map(() => new Lotto(generateLottoNumbers()));
};

const isCashInputError = (error) => {
  return Object.values(ALERT_MESSAGE.ERROR.CASH_INPUT).includes(error.message);
};

const createLottosAfterValidation = (event) => {
  event.preventDefault();

  try {
    validate($cashInput.value);

    store.dispatch({
      type: ACTION_TYPE.LOTTOS.ADDED,
      payload: createLottos(Number($cashInput.value)),
    });
  } catch (error) {
    if (isCashInputError(error)) {
      alert(error.message);
      return;
    }

    console.error(error);
  } finally {
    $cashInput.clear();
    $cashInput.focus();
  }
};

$cashContainer.addEventListener("submit", createLottosAfterValidation);
