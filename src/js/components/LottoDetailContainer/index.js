import store from "../../store/index.js";
import Presentational from "./Presentational.js";

const createContainer = () => {
  const select = (state) => state.lottos;

  let currentLottos = select(store.getState());

  const render = () => {
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
    store.subscribe(render);
  };

  return { init };
};

const LottoDetailContainer = createContainer();

export default LottoDetailContainer;
