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
import store from "../../store/index.js";
import { EmptyInputError, ValidationError } from "../../errors/index.js";
import Presentational from "./Presentational.js";

const createContainer = () => {
  const $container = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.CONTAINER));
  const $lottos = $(toDAS(JS_SELECTOR.PURCHASE_MODAL.LOTTOS));

  let lottoCount = 0;

  const toNumbers = ($$inputs) => {
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
  };

  const validate = (numbers) => {
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
  };

  const togglePurchaseLottoMode = ({ target }) => {
    if (target.dataset.jsSelector !== JS_SELECTOR.PURCHASE_MODAL.TOGGLE) {
      return;
    }

    const $lotto = target.closest(toDAS(JS_SELECTOR.PURCHASE_MODAL.LOTTO));
    const $$inputs = $$(toDAS(JS_SELECTOR.PURCHASE_MODAL.INPUT), {
      $parent: $lotto,
    });

    if (target.checked) {
      $$inputs.forEach(($input) => {
        $input.disabled = true;
      });

      return;
    }

    $$inputs.forEach(($input) => {
      $input.disabled = false;
    });
  };

  const createLottosAfterValidation = (event) => {
    event.preventDefault();

    try {
      const lottos = [];
      [...Array(lottoCount)].forEach((_, index) => {
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
          const lottoNumbers = toNumbers(purchaseLottoInputs);
          validate(lottoNumbers);
          lottos.push(new Lotto(lottoNumbers));
        }
      });

      store.dispatch({
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

    $lottos.innerHTML = "";
    closeModal();
  };

  const select = (state) => ({
    isPurchasing: state.isPurchasing,
    cash: state.cash,
  });

  const render = () => {
    const currentValue = select(store.getState());

    const { isPurchasing, cash } = currentValue;

    if (!isPurchasing) return;

    lottoCount = Math.floor(cash / Lotto.UNIT_PRICE);
    Presentational.render(lottoCount);
  };

  const cancelPurchase = () => {
    $lottos.innerHTML = "";

    store.dispatch({
      type: ACTION_TYPE.LOTTOS.CANCEL_ADDING,
    });

    closeModal();
  };

  const closeModal = () => {
    $container.classList.remove(CLASSNAME.MODAL.OPEN);
  };

  const init = () => {
    Presentational.init({
      createLottosAfterValidation,
      togglePurchaseLottoMode,
      cancelPurchase,
    });
    store.subscribe(render);
  };

  return { init };
};

const CashContainer = createContainer();

export default CashContainer;
