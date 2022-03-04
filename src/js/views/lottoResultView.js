import View from "./View.js";
import { $, showElement } from "../utils/dom.js";

export default class LottoResultView extends View {
  constructor() {
    super();
  }

  renderResultModal() {
    showElement($(".result-modal"));
  }
}
