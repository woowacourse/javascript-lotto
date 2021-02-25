import { JS_SELECTOR } from "../../constants/index.js";
import store from "../../store/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";
import Presentational from "./Presentational.js";

const createContainer = () => {
  const $lottoIconWrapper = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER));
  const $lottoDetailContainer = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER));

  const select = (state) => state.lottos;

  let currentLottos = select(store.getState());

  const toggleDetailMode = (force) => {
    $lottoIconWrapper.toggle("flex-col", force);
    $lottoDetailContainer.toggle("detail", force);
  };

  const render = () => {
    const previousLottos = currentLottos;
    currentLottos = select(store.getState());

    const hasChanged = previousLottos !== currentLottos;
    if (!hasChanged) return;

    Presentational.render({
      lottos: currentLottos,
      isLottoCleared: currentLottos.length === 0,
      toggleDetailMode,
    });
  };

  const init = () => {
    Presentational.init({ toggleDetailMode });
    store.subscribe(render);
  };

  return { init };
};

const LottoDetailContainer = createContainer();

export default LottoDetailContainer;
