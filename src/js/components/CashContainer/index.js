import { ACTION_TYPE, JS_SELECTOR } from "../../constants/index.js";
import {
  toNumber,
  generateLottoNumbers,
  validateCash,
} from "../../utils/index.js";
import { Lotto } from "../../models/index.js";
import store from "../../store/index.js";
import { CustomError } from "../../errors/index.js";
import Presentational from "./Presentational.js";

const select = (state) => state.lottos;

const createContainer = () => {
  const handleStateChange = () => {
    Presentational.render();
  };

  const createActionLottosAdded = (event) => {
    event.preventDefault();

    try {
      const $cashInput = event.target.elements[JS_SELECTOR.CASH.INPUT];
      const cash = toNumber($cashInput.value);

      validateCash(cash);

      const lottoCount = Math.floor(cash / Lotto.UNIT_PRICE);
      const lottos = Array.from({ length: lottoCount }).map(
        () => new Lotto(generateLottoNumbers())
      );

      store.dispatch({
        type: ACTION_TYPE.LOTTOS.ADDED,
        payload: lottos,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        Presentational.notifyError(error);
        return;
      }

      throw error;
    }
  };

  const init = () => {
    Presentational.init(createActionLottosAdded);
    store.subscribe(handleStateChange, select);
  };

  return { init };
};

const CashContainer = createContainer();

export default CashContainer;
