import { ACTION_TYPE, SUGGESTION_MESSAGE } from "../../constants/index.js";
import { CustomError } from "../../errors/index.js";
import Lotto from "../../models/Lotto.js";
import store from "../../store/index.js";
import {
  generateLottoNumbers,
  readLottoNumber,
  validateLottoNumbersAreUnique,
} from "../../utils/index.js";
import Presentational from "./Presentational.js";

const toLottoNumbers = ($entry) => {
  const [{ value: issueMode }, $$inputs] = $entry;

  if (issueMode === "auto") {
    return generateLottoNumbers();
  }

  const numbers = Array.from($$inputs).map(($input) => {
    return readLottoNumber($input.value);
  });

  validateLottoNumbersAreUnique(...numbers);

  return numbers;
};

const select = (state) => {
  const { cash, lottos } = state;

  if (cash % Lotto.UNIT_PRICE !== 0) {
    throw new Error(
      `[IssueManager][Container] cash는 ${Lotto.UNIT_PRICE}의 배수여야 합니다. cash: ${cash}`
    );
  }

  const totalLottoCount = cash / Lotto.UNIT_PRICE;
  const issuedLottoCount = lottos.length;
  const issuableLottoCount = totalLottoCount - issuedLottoCount;

  return issuableLottoCount;
};

const createContainer = () => {
  const handleStateChange = (previousIssuableLottoCount) => {
    const totalIssuableLottoCount = select(store.getState());
    const addedIssuableLottoCount = Math.max(
      totalIssuableLottoCount - previousIssuableLottoCount,
      0
    );

    Presentational.render({
      totalIssuableLottoCount,
      addedIssuableLottoCount,
    });
  };

  const createActionLottosAdded = (event) => {
    event.preventDefault();

    try {
      const totalIssuableLottoCount = select(store.getState());
      const $$entries = Array.from({ length: totalIssuableLottoCount }).map(
        (_, index) => {
          return [
            event.target.elements[`issue-mode-${index}`],
            event.target.elements[`entry__number-${index}`],
          ];
        }
      );

      store.dispatch({
        type: ACTION_TYPE.LOTTOS.ADDED,
        payload: $$entries
          .map(toLottoNumbers)
          .map((numbers) => new Lotto(numbers)),
      });
    } catch (error) {
      if (error instanceof CustomError) {
        Presentational.notifyError(
          `${error.message} ${SUGGESTION_MESSAGE.LOTTO_NUMBERS_INPUT}`
        );
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

const Container = createContainer();

export default Container;
