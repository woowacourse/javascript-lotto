import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";
import { Presentational } from "../core/index.js";

class PurchaseModalPresentational extends Presentational {
  constructor({ eventListeners }) {
    super({ eventListeners });
  }

  initalize() {
    this.$container = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.CONTAINER));
    this.$form = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.FORM));
    this.$lottos = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.LOTTOS));
    this.$close = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.CLOSE));
  }

  setEventListener({
    eventListeners: {
      createLottosAfterValidation,
      togglePurchaseLottoMode,
      cancelPurchase,
    },
  }) {
    this.$form.addEventListener("submit", createLottosAfterValidation);
    this.$form.addEventListener("change", togglePurchaseLottoMode);
    this.$close.addEventListener("click", cancelPurchase);
  }

  render(lottoCount) {
    [...Array(lottoCount)].forEach((_, index) => {
      this.$lottos.innerHTML += this.TEMPLATE(index);
    });
    this.$container.classList.add(CLASSNAME.MODAL.OPEN);
  }

  TEMPLATE(index) {
    return `
    <div class="d-flex items-center" data-js-selector="purchase-modal-container__lotto">
      <span>${index + 1}.</span>
      <div class="d-flex flex-row justify-center">
        <div class="flex-auto flex-row d-flex justify-center pr-1">
          <label class="switch">
            <input
              type="checkbox"
              class="lotto-numbers-toggle-button"
              data-js-selector="purchase-modal-container__toggle"
              checked
            />
            <span class="text-base font-normal --unselectable"></span>
          </label>
          <span class="text-base font-normal --unselectable">자동</span>
          <span class="text-base font-normal --unselectable --hidden"
            >수동</span
          >
        </div>
      </div>
      <input
        type="number"
        class="winning-number mx-1 text-center"
        data-js-selector="purchase-modal-container__input"
        min="1"
        max="45"
        step="1"
        placeholder="01"
        disabled
      />
      <input
        type="number"
        class="winning-number mx-1 text-center"
        data-js-selector="purchase-modal-container__input"
        min="1"
        max="45"
        step="1"
        placeholder="02"
        disabled
      />
      <input
        type="number"
        class="winning-number mx-1 text-center"
        data-js-selector="purchase-modal-container__input"
        min="1"
        max="45"
        step="1"
        placeholder="03"
        disabled
      />
      <input
        type="number"
        class="winning-number mx-1 text-center"
        data-js-selector="purchase-modal-container__input"
        min="1"
        max="45"
        step="1"
        placeholder="04"
        disabled
      />
      <input
        type="number"
        class="winning-number mx-1 text-center"
        data-js-selector="purchase-modal-container__input"
        min="1"
        max="45"
        step="1"
        placeholder="05"
        disabled
      />
      <input
        type="number"
        class="winning-number mx-1 text-center"
        data-js-selector="purchase-modal-container__input"
        min="1"
        max="45"
        step="1"
        placeholder="06"
        disabled
      />
      </div>
    </div>
  `;
  }
}

export default PurchaseModalPresentational;
