import AppView from "../../View/WebView/AppView.js";

import LottoResultController from "./LottoResultController.js";

import { AMOUNT_PRICE } from "../../constants/lottoConstants.js";

class AppController {
  view;
  constructor() {
    this.view = new AppView();
  }
  run() {
    this.view.render({});
    this.view.readPrice((price) => {
      this.#inputPrice(price);
    });
  }
  #inputPrice(price) {
    const amount = price / AMOUNT_PRICE;

    const lottoResultController = new LottoResultController(this.view);
    lottoResultController.run(amount);
  }
}

export default AppController;
