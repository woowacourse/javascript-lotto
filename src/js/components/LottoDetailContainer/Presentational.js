import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import {
  $,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";

export const createPresentational = () => {
  const $lottoDetailLabel = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.LABEL));
  const $lottoIconWrapper = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER));
  const $lottoDetailContainer = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER));
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
        .map((number) => number.toString().padStart(2, 0))
        .join(", ")}
      </span>
    </div>
  `;
  };

  const render = ({ lottos, isLottoCleared, toggleDetailMode }) => {
    if (isLottoCleared) {
      toggleDetailMode(false);
      $toggleButton.checked = false;
      $lottoDetailContainer.hide();
      return;
    }

    $lottoDetailLabel.innerText = `총 ${lottos.length}개를 구매하였습니다.`;

    $lottoIconWrapper.innerHTML = lottos
      .map((lotto) => TEMPLATE(lotto))
      .join("");

    $lottoDetailContainer.show();
  };

  const init = ({ toggleDetailMode }) => {
    $toggleButton.addEventListener("change", (event) => {
      toggleDetailMode(event.target.checked);
    });
  };

  return { init, render };
};

const Presentaional = createPresentational();

export default Presentaional;
