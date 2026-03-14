import LottoResultController from "./LottoResultController.js";

import { AMOUNT_PRICE } from "../../constants/lottoConstants.js";

class AppController {
  view;
  model;
  constructor(view, model) {
    this.view = view;
    this.model = {};
  }
  run() {
    this.view.outputView.renderApp({});
    this.#inputPrice();
  }
  #inputPrice() {
    this.view.inputView.readPrice((price) => {
      const amount = price / AMOUNT_PRICE;

      const lottoResultController = new LottoResultController(this.view);
      lottoResultController.run(amount);
    });
  }
}

export default AppController;
