import { ACTION_TYPE, JS_SELECTOR } from "../../constants/index.js";
import { toNumber, generateLottoNumbers } from "../../utils/index.js";
import { Lotto } from "../../models/index.js";
import store from "../../store/index.js";
import {
  CustomError,
  NotAnIntegerError,
  OutOfRangeError,
} from "../../errors/index.js";
import Presentational from "./Presentational.js";

const createContainer = () => {
  const validateCash = (cash) => {
    if (!Number.isInteger(cash)) {
      throw new NotAnIntegerError(cash);
    }

    if (cash < Lotto.UNIT_PRICE) {
      throw new OutOfRangeError(cash, { min: Lotto.UNIT_PRICE });
    }
  };

  const createLottos = (cash) => {
    const lottoCount = Math.floor(cash / Lotto.UNIT_PRICE);

    return [...Array(lottoCount)].map(() => new Lotto(generateLottoNumbers()));
  };

  const createLottosAfterValidation = (event) => {
    event.preventDefault();

    const $cashInput = event.target.elements[JS_SELECTOR.CASH.INPUT];

    try {
      const cash = toNumber($cashInput.value);
      validateCash(cash);

      store.dispatch({
        type: ACTION_TYPE.LOTTOS.ADDED,
        payload: createLottos(cash),
      });
    } catch (error) {
      if (error instanceof CustomError) {
        Presentational.notifyError(error);
        return;
      }

      throw error;
    }
  };

  const select = (state) => state.lottos;

  let currentLottos = select(store.getState());

  const render = () => {
    let previousLottos = currentLottos;
    currentLottos = select(store.getState());

    const hasChanged = previousLottos !== currentLottos;

    if (!hasChanged) return;

    Presentational.render();
  };

  const init = () => {
    Presentational.init({ createLottosAfterValidation });
    store.subscribe(render);
  };

  return { init };
};

const CashContainer = createContainer();

export default CashContainer;
