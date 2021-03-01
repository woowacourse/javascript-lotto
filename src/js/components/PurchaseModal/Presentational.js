import { CLASSNAME, JS_SELECTOR } from "../../constants/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";

const createPresentaional = () => {
  const $container = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.CONTAINER));
  const $form = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.FORM));
  const $lottos = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.LOTTOS));
  const $close = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.CLOSE));

  const render = (lottoCount) => {
    [...Array(lottoCount)].forEach((_, index) => {
      $lottos.innerHTML += TEMPLATE(index);
    });
    $container.classList.add(CLASSNAME.MODAL.OPEN);
  };

  const init = ({
    createLottosAfterValidation,
    togglePurchaseLottoMode,
    cancelPurchase,
  }) => {
    $form.addEventListener("submit", createLottosAfterValidation);
    $form.addEventListener("change", togglePurchaseLottoMode);
    $close.addEventListener("click", cancelPurchase);
  };

  return { init, render };
};

const Presentational = createPresentaional();

export default Presentational;

const TEMPLATE = (index) => {
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
};
