import { JS_SELECTOR } from "../../constants/index.js";
import { $, toDataAttributeSelector as toDAS } from "../../utils/index.js";
import LottoDetailPresentational from "./Presentational.js";
import { Container } from "../core/index.js";

class LottoDetailContainer extends Container {
  constructor() {
    super(LottoDetailPresentational);
  }

  initalize() {
    this.$lottoIconWrapper = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.ICON_WRAPPER));
    this.$lottoDetailContainer = $(toDAS(JS_SELECTOR.LOTTO_DETAIL.CONTAINER));
  }

  getEventListeners() {
    return { toggleDetailMode: this.toggleDetailMode.bind(this) };
  }

  select() {
    const state = this.store.getState();
    return state.lottos;
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

  toggleDetailMode(force) {
    this.$lottoIconWrapper.toggle("flex-col", force);
    this.$lottoDetailContainer.toggle("detail", force);
  }
}

export default LottoDetailContainer;
