import { ALERT_MESSAGE, JS_SELECTOR } from "./constants/index.js";
import {
  $,
  generateLottoNumbers,
  toDataAttributeSelector as toDAS,
} from "./utils/index.js";
import Lotto from "./Lotto.js";
import { show } from "./utils/index.js";

const $cashButton = $(toDAS(JS_SELECTOR.CASH.BUTTON));
const $cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));
const $lottoDetailContainer = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER));
const $lottoDetailLabel = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.LABEL));
const $lottoIconWrapper = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER));

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

$cashButton.addEventListener("click", () => {
  const alertMessage = getAlertMessage($cashInput.value);

  if (alertMessage !== "") {
    alert(alertMessage);
    $cashInput.value = "";
    return;
  }

  const cash = Number($cashInput.value);
  const lottoCount = Math.floor(cash / 1000);

  const lottos = [];
  for (let i = 0; i < lottoCount; i++) {
    lottos.push(new Lotto(generateLottoNumbers()));
  }

  $lottoDetailLabel.innerText = `총 ${lottoCount}개를 구매하였습니다.`;

  const LOTTO_ICON_TEMPLATE = `
      <span
        class="mx-1 text-4xl"
        data-js-selector="lotto-detail-container__icon"
        >🎟️
      </span>
    `;
  $lottoIconWrapper.innerHTML = LOTTO_ICON_TEMPLATE.repeat(lottos.length);
  show($lottoDetailContainer);
});
