import LottoGame from "../Model/LottoGame.js";
import LottoList from "../Model/LottoList.js";
import Rate from "../Model/Rate.js";
import { parsingNumbers, stringToNumber } from "../utils/parsing.js";
import Validator from "../Validator.js";
import InputView from "../View/WebView/InputView.js";
import OutputView from "../View/WebView/OutputView.js";
import { AMOUNT_PRICE } from "../constants/lottoConstants.js";

class App {
  #validator;
  #inputView;
  #outputView;

  #model = {};

  constructor() {
    this.#validator = new Validator();
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }

  async run() {
    this.#inputView.readPrice((price) => {
      const amount = price / AMOUNT_PRICE;
      const lottoList = new LottoList(amount);
      this.#model.lottoList = lottoList;

      this.#outputView.renderLottoResult(amount, lottoList);

      this.#inputView.readLottoNumber((winningNumbers, bonusNumber) => {
        const lottoGame = new LottoGame(winningNumbers, bonusNumber);
        this.#model.lottoGame = lottoGame;
        const statistics = lottoGame.getStatistics(this.#model.lottoList);

        const rate = new Rate(
          statistics,
          this.#model.lottoList.getLottoList().length * AMOUNT_PRICE,
        );
        this.#model.rate = rate;

        this.#outputView.renderStatisticsResult(statistics, rate.getRate());
      });

      const restartButton = document.querySelector("#restart-button");
      restartButton.addEventListener("click", () => {
        this.#outputView.printReset();
      });

      const modalCloseButton = document.querySelector("#modal-close-button");
      modalCloseButton.addEventListener("click", () => {
        this.#outputView.printReset();
      });
    });
  }
}

export default App;
