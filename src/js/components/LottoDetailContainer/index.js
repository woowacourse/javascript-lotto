import store from "../../store/index.js";
import Presentational from "./Presentational.js";

const select = (state) => state.lottos;

const createContainer = () => {
  const handleStateChange = () => {
    const lottos = select(store.getState());

    Presentational.render({ lottos, isLottoCleared: lottos.length === 0 });
  };

  const init = () => {
    Presentational.init();
    store.subscribe(
      handleStateChange,
      (prev, curr) => select(prev) !== select(curr)
    );
  };

  return { init };
};

const LottoDetailContainer = createContainer();

export default LottoDetailContainer;
