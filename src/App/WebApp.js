import LottoGame from "../Model/LottoGame.js";
import LottoList from "../Model/LottoList.js";
import Rate from "../Model/Rate.js";
import { parsingNumbers, stringToNumber } from "../utils/parsing.js";
import Validator from "../Validator.js";
import InputView from "../View/WebView/InputView.js";
import OutputView from "../View/WebView/OutputView.js";

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
    let winningNumbers;
    let bonusNumber;

    const buyButton = document.querySelector("#buy-button");
    buyButton.addEventListener("click", () => {
      const priceInput = document.querySelector("#price input");
      const price = priceInput.value;

      const lottoList = new LottoList(price / 1000);
      this.#model.lottoList = lottoList;

      this.#outputView.printAmount(price);
      this.#outputView.printLottos(lottoList);
    });

    // winningNumbers = await this.#inputWinningNumbers();
    // bonusNumber = await this.#inputBonusNumber(winningNumbers);

    // const lottoGame = new LottoGame(winningNumbers, bonusNumber);
    // const statistics = lottoGame.getStatistics(lottoList);
    // const rate = new Rate(statistics, price);

    // this.#showResult(statistics, rate.getRate());

    // const isRetry = await this.#inputView.readIsRetry();
    // if (isRetry === "y") {
    //   await this.run();
    // }
  }
  async #inputPrice() {
    let price;
    while (true) {
      try {
        price = await this.#inputView.readPrice();
        this.#validator.validatePrice(price);

        break;
      } catch (err) {
        this.#outputView.printError(err.message);
      }
    }
    return price;
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
  #showResult(satistics, rate) {
    this.#outputView.printStatistics(satistics);
    this.#outputView.printRate(rate);
  }
}

export default App;
