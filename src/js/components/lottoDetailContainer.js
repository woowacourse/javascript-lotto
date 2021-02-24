import { CLASSNAME, JS_SELECTOR } from "../constants/index.js";
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

  const toggleDetailMode = (force) => {
    $lottoIconWrapper.toggle("flex-col", force);
    $lottoDetailContainer.toggle("detail", force);
  };

  const select = (state) => state.lottos;

  let currentLottos = select(store.getState());
  const render = () => {
    let previousLottos = currentLottos;
    currentLottos = select(store.getState());

    const hasChanged = previousLottos !== currentLottos;

    if (!hasChanged) return;

    const isLottoInitialAdded = previousLottos.length === 0;

    if (isLottoInitialAdded) {
      $lottoDetailLabel.innerText = `총 ${currentLottos.length}개를 구매하였습니다.`;

      $lottoIconWrapper.innerHTML = currentLottos
        .map((lotto) => TEMPLATE(lotto))
        .join("");

      $lottoDetailContainer.show();
      return;
    }

    const isLottoCleared = currentLottos.length === 0;

    if (isLottoCleared) {
      toggleDetailMode(false);
      $toggleButton.checked = false;
      $lottoDetailContainer.hide();
      return;
    }
  };

  const init = () => {
    $toggleButton.addEventListener("change", (event) => {
      toggleDetailMode(!event.target.checked);
    });

    store.subscribe(render);
  };

  return { init };
};

const LottoDetailContainer = createLottoDetailContainer();

export default LottoDetailContainer;
