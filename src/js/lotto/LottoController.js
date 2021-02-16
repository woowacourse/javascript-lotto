import LottoModel from "./LottoModel.js";
import LottoView from "./LottoView.js";
import { INVALID_PRICE_ERROR } from "./constants.js";

export default function LottoController() {
  this.model = new LottoModel();
  this.view = new LottoView();
}
