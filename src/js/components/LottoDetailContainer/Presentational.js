import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import {
  $,
  toClassSelector as toCS,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";
import { Presentational } from "../core/index.js";

class LottoDetailPresentational extends Presentational {
  constructor(eventListeners) {
    super(eventListeners);
  }

  initalize() {
    this.$lottoDetailLabel = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.LABEL));
    this.$lottoIconWrapper = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER));
    this.$lottoDetailContainer = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER));
    this.$toggleButton = $(toCS(CLASSNAME.LOTTO_DETAIL.TOGGLE_BUTTON));
  }

  setEventListeners({ toggleDetailMode }) {
    this.$toggleButton.addEventListener("change", (event) => {
      toggleDetailMode(event.target.checked);
    });
  }

  render({ lottos, isLottoCleared, toggleDetailMode }) {
    if (isLottoCleared) {
      toggleDetailMode(false);
      this.$toggleButton.checked = false;
      this.$lottoDetailContainer.hide();
      return;
    }

    this.$lottoDetailLabel.innerText = `총 ${lottos.length}개를 구매하였습니다.`;

    this.$lottoIconWrapper.innerHTML = lottos
      .map((lotto) => this.TEMPLATE(lotto))
      .join("");

    this.$lottoDetailContainer.show();
  }

  TEMPLATE(lotto) {
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
  }
}

export default LottoDetailPresentational;
