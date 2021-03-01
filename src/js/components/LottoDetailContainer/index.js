import { JS_SELECTOR } from "../../constants/index.js";
import store from "../../store/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";
import LottoDetailPresentational from "./Presentational.js";
import { Container } from "../core/index.js";

class LottoDetailContainer extends Container {
  constructor() {
    super();
    this.Presentational = new LottoDetailPresentational({
      eventListeners: { toggleDetailMode: this.toggleDetailMode.bind(this) },
    });
  }

  initalize() {
    this.$lottoIconWrapper = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER));
    this.$lottoDetailContainer = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER));
  }

  select() {
    const state = store.getState();
    return state.lottos;
  }

  toggleDetailMode(force) {
    this.$lottoIconWrapper.toggle("flex-col", force);
    this.$lottoDetailContainer.toggle("detail", force);
  }

  render() {
    if (!this.hasChanged()) return;

    this.Presentational.render({
      lottos: this.currentValue,
      isLottoCleared: this.currentValue.length === 0,
      toggleDetailMode: this.toggleDetailMode.bind(this),
    });

    this.updateValue();
  }
}

export default LottoDetailContainer;
