import LottoGame from "../Model/LottoGame.js";
import LottoList from "../Model/LottoList.js";
import Rate from "../Model/Rate.js";
import { parsingNumbers, stringToNumber } from "../utils/parsing.js";
import Validator from "../Validator.js";
import InputView from "../View/WebView/InputView.js";
import OutputView from "../View/WebView/OutputView.js";
import { AMOUNT_PRICE } from "../constants/lottoConstants.js";

import AppController from "../Controller/WebController/AppController.js";

class App {
  #validator;
  #inputView;
  #outputView;

  constructor() {
    this.#validator = new Validator();
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }

  async run() {
    const appController = new AppController({
      inputView: this.#inputView,
      outputView: this.#outputView,
    });

    appController.run({
      input: this.#inputView,
      output: this.#outputView,
    });
  }
}

export default App;
