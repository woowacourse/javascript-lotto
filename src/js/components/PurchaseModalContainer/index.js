import {
  ACTION_TYPE,
  ALERT_MESSAGE,
  CLASSNAME,
  JS_SELECTOR,
} from "../../constants/index.js";
import {
  generateLottoNumbers,
  $$,
  toDataAttributeSelector as toDAS,
  $,
} from "../../utils/index.js";
import { Lotto } from "../../models/index.js";
import { EmptyInputError, ValidationError } from "../../errors/index.js";
import PurchaseModalPresentational from "./Presentational.js";
import { Container } from "../core/index.js";

class PurchaseModalContainer extends Container {
  constructor() {
    super(PurchaseModalPresentational);
  }

  initalize() {
    this.$container = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.CONTAINER));
    this.$lottos = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.LOTTOS));

    this.lottoCount = 0;
  }

  getEventListeners() {
    return {
      createLottosAfterValidation: this.createLottosAfterValidation.bind(this),
      togglePurchaseLottoMode: this.togglePurchaseLottoMode.bind(this),
      cancelPurchase: this.cancelPurchase.bind(this),
    };
  }

  select() {
    const state = this.store.getState();
    return {
      isPurchasing: state.isPurchasing,
      cash: state.cash,
    };
  }

  render() {
    const { isPurchasing, cash } = this.select();

    if (!isPurchasing) return;

    this.lottoCount = Math.floor(cash / Lotto.UNIT_PRICE);
    this.Presentational.render(this.lottoCount);
  }

  createLottosAfterValidation(event) {
    event.preventDefault();

    try {
      const lottos = [];
      [...Array(this.lottoCount)].forEach((_, index) => {
        const purchaseLottos = $$(toDAS(JS_SELECTOR.PURCHASE_MODAL.LOTTO));
        const purchaseLottoToggleButton = $(
          toDAS(JS_SELECTOR.PURCHASE_MODAL.TOGGLE),
          {
            $parent: purchaseLottos[index],
          }
        );
        const purchaseLottoInputs = $$(
          toDAS(JS_SELECTOR.PURCHASE_MODAL.INPUT),
          { $parent: purchaseLottos[index] }
        );

        if (purchaseLottoToggleButton.checked) {
          lottos.push(new Lotto(generateLottoNumbers()));
        } else {
          const lottoNumbers = this.toNumbers(purchaseLottoInputs);
          this.validate(lottoNumbers);
          lottos.push(new Lotto(lottoNumbers));
        }
      });

      this.store.dispatch({
        type: ACTION_TYPE.LOTTOS.ADDED,
        payload: lottos,
      });
    } catch (error) {
      if (
        error instanceof EmptyInputError ||
        error instanceof ValidationError
      ) {
        alert(error.message);
        return;
      }

      throw error;
    }

    this.$lottos.innerHTML = "";
    this.closeModal();
  }

  toNumbers($$inputs) {
    const inputs = [...$$inputs];

    if (inputs.some(($input) => $input.isEmpty())) {
      throw new EmptyInputError(
        ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.EMPTY
      );
    }

    const numbers = inputs
      .map(($input) => Number($input.value))
      .sort((a, b) => a - b);

    return numbers;
  }

  validate(numbers) {
    const numbersSet = new Set([...numbers]);

    if (numbersSet.size < numbers.length) {
      throw new ValidationError(
        ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.DUPLICATED
      );
    }

    if (
      [...numbersSet].some((number) => {
        return (
          !Number.isInteger(number) ||
          number < Lotto.MIN_NUMBER ||
          number > Lotto.MAX_NUMBER
        );
      })
    ) {
      throw new ValidationError(
        ALERT_MESSAGE.ERROR.WINNING_NUMBERS_INPUT.OUT_OF_RANGE
      );
    }
  }

  closeModal() {
    this.$container.classList.remove(CLASSNAME.MODAL.OPEN);
  }

  togglePurchaseLottoMode({ target }) {
    if (target.dataset.jsSelector !== JS_SELECTOR.PURCHASE_MODAL.TOGGLE) {
      return;
    }

    const $lotto = target.closest(toDAS(JS_SELECTOR.PURCHASE_MODAL.LOTTO));
    const $auto = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.AUTO), {
      $parent: $lotto,
    });
    const $manual = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.MANUAL), {
      $parent: $lotto,
    });
    const $$inputs = $$(toDAS(JS_SELECTOR.PURCHASE_MODAL.INPUT), {
      $parent: $lotto,
    });

    $$inputs.forEach(($input) => {
      $input.toggleDisabled();
    });

    $auto.toggle(CLASSNAME.COMMON.HIDDEN);
    $manual.toggle(CLASSNAME.COMMON.HIDDEN);
  }

  cancelPurchase() {
    this.$lottos.innerHTML = "";

    this.store.dispatch({
      type: ACTION_TYPE.LOTTOS.CANCEL_ADDING,
    });

    this.closeModal();
  }
}

export default PurchaseModalContainer;
