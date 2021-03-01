import store from "../../store/index.js";
import Presentational from "./Presentational.js";

const createContainer = () => {
  const select = (state) => state.lottos;

  let currentLottos = select(store.getState());

  const handleStateChange = () => {
    const previousLottos = currentLottos;
    currentLottos = select(store.getState());

    const hasChanged = previousLottos !== currentLottos;
    if (!hasChanged) return;

    Presentational.render({
      lottos: currentLottos,
      isLottoCleared: currentLottos.length === 0,
    });
  };

  const init = () => {
    Presentational.init();
    store.subscribe(handleStateChange);
  };

  return { init };
};

const LottoDetailContainer = createContainer();

export default LottoDetailContainer;
