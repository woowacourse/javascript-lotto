import { ACTION_TYPE, JS_SELECTOR } from "../../constants/index.js";
import { toNumber, validateCash } from "../../utils/index.js";
import { Lotto } from "../../models/index.js";
import store from "../../store/index.js";
import { CustomError } from "../../errors/index.js";
import Presentational from "./Presentational.js";

const select = (state) => state.lottos;

const createContainer = () => {
  const handleStateChange = () => {
    Presentational.render();
  };

  const createActionCashAdded = (event) => {
    event.preventDefault();

    try {
      const $cashInput = event.target.elements[JS_SELECTOR.CASH.INPUT];
      const cash = toNumber($cashInput.value);

      validateCash(cash);

      store.dispatch({
        type: ACTION_TYPE.CASH.ADDED,
        payload: cash - (cash % Lotto.UNIT_PRICE),
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
    Presentational.init(createActionCashAdded);
    store.subscribe(handleStateChange, select);
  };

  return { init };
};

const CashContainer = createContainer();

export default CashContainer;
