import { ALERT_MESSAGE, CLASSNAME, JS_SELECTOR } from "./constants/index.js";
import {
  $,
  generateLottoNumbers,
  toDataAttributeSelector as toDAS,
  toClassSelector as toCS,
} from "./utils/index.js";
import Lotto from "./Lotto.js";
import { show } from "./utils/index.js";

const $cashContainer = $(toDAS(JS_SELECTOR.CASH.CONTAINER));
const $cashInput = $(toDAS(JS_SELECTOR.CASH.INPUT));
const $lottoDetailContainer = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER));
const $lottoDetailLabel = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.LABEL));
const $lottoIconWrapper = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER));
const $toggleButton = $(toCS(CLASSNAME.LOTTO_DETAIL.TOGGLE_BUTTON));

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

  const lottos = [];
  for (let i = 0; i < lottoCount; i++) {
    lottos.push(new Lotto(generateLottoNumbers().sort((a, b) => a - b)));
  }

  $lottoDetailLabel.innerText = `총 ${lottoCount}개를 구매하였습니다.`;

  const lottoTemplate = (lotto) => {
    return `
      <div class="d-flex items-center">
        <span
          class="mx-1 text-4xl"
          data-js-selector=${JS_SELECTOR.LOTTO_DETAIL.ICON}
          >🎟️
        </span>
        <span 
          class="lotto-numbers"
          data-js-selector=${JS_SELECTOR.LOTTO_DETAIL.NUMBERS}
        >${lotto.numbers
          .map((number) => String(number).padStart(2, 0))
          .join(", ")}
        </span>
      </div>
    `;
  };

  $lottoIconWrapper.innerHTML = lottos
    .map((lotto) => lottoTemplate(lotto))
    .join("");

  show($lottoDetailContainer);
});

$toggleButton.addEventListener("change", () => {
  $lottoIconWrapper.classList.toggle("flex-col");
  $lottoDetailContainer.classList.toggle("detail");
});
