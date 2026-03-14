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

      const resultButton = document.querySelector("#result-button");
      resultButton.addEventListener("click", () => {
        const winningNumbers = [
          ...document.querySelectorAll("#winning-lottos .ui-pin"),
        ]
          .map((pinElement) => {
            return pinElement.querySelector("input").value;
          })
          .map(Number);

        const bonusNumber = document.querySelector("#bonus-lotto input").value;

        const lottoGame = new LottoGame(winningNumbers, Number(bonusNumber));
        this.#model.lottoGame = lottoGame;
        const statistics = lottoGame.getStatistics(this.#model.lottoList);
        const rate = new Rate(
          statistics,
          this.#model.lottoList.getLottoList().length * AMOUNT_PRICE,
        );
        this.#model.rate = rate;

        this.#outputView.renderStatisticsResult(statistics, rate.getRate());
      });
    });

    const restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", () => {
      this.#outputView.printReset();
    });

    const modalCloseButton = document.querySelector("#modal-close-button");
    modalCloseButton.addEventListener("click", () => {
      this.#outputView.printReset();
    });
  }
  async #inputWinningNumbers() {
    let winningNumbers;
    while (true) {
      try {
        const lottoNumbers = await this.#inputView.readLottoNumbers();

        winningNumbers = parsingNumbers(lottoNumbers);
        this.#validator.validateLottoNumbers(winningNumbers);

        break;
      } catch (err) {
        this.#outputView.printError(err.message);
      }
    }
    return winningNumbers;
  }
  async #inputBonusNumber(winningNumbers) {
    let bonusNumber;
    while (true) {
      try {
        bonusNumber = await this.#inputView.readBonusNumber();
        this.#validator.validateBonusNumber(
          winningNumbers,
          stringToNumber(bonusNumber),
        );

        break;
      } catch (err) {
        this.#outputView.printError(err.message);
      }
    }
    return bonusNumber;
  }
}

export default App;
