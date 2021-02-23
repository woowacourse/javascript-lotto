import { CLASSNAME, JS_SELECTOR, STATE_TYPE } from "../constants/index.js";
import {
  $,
  toDataAttributeSelector as toDAS,
  toClassSelector as toCS,
} from "../utils/index.js";
import store from "../store/index.js";

const createLottoDetailContainer = () => {
  const $lottoDetailContainer = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER));
  const $lottoDetailLabel = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.LABEL));
  const $lottoIconWrapper = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER));
  const $toggleButton = $(toCS(CLASSNAME.LOTTO_DETAIL.TOGGLE_BUTTON));

  const TEMPLATE = (lotto) => {
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

  const render = () => {
    const { lottos } = store.getState();

    if (lottos.length === 0) {
      $lottoDetailContainer.hide();
      return;
    }

    $lottoDetailLabel.innerText = `총 ${lottos.length}개를 구매하였습니다.`;

    $lottoIconWrapper.innerHTML = lottos
      .map((lotto) => TEMPLATE(lotto))
      .join("");

    $lottoDetailContainer.show();
  };

  const toggleDetailMode = () => {
    $lottoIconWrapper.toggle("flex-col");
    $lottoDetailContainer.toggle("detail");
  };

  const init = () => {
    $toggleButton.addEventListener("change", toggleDetailMode);

    store.subscribe(STATE_TYPE.LOTTOS, render);
  };

  return { init };
};

const LottoDetailContainer = createLottoDetailContainer();

export default LottoDetailContainer;
