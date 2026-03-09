import LottoGame from "./Model/LottoGame.js";
import LottoList from "./Model/LottoList.js";
import Rate from "./Model/Rate.js";
import { parsingNumbers, stringToNumber } from "./utils/parsing.js";
import Validator from "./Validator.js";
import InputView from "./View/InputView.js";
import OutputView from "./View/OutputView.js";

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
    let price;
    let winningNumbers;
    let bonusNumber;

    while (true) {
      try {
        price = await this.#inputView.readPrice();
        this.#validator.validatePrice(price);

        break;
      } catch (err) {
        this.#outputView.printError(err.message);
      }
    }

    const lottoList = new LottoList(price / 1000);
    this.#outputView.printAmount(price);
    this.#outputView.printLottos(lottoList.getLottoList());

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

    while (true) {
      try {
        bonusNumber = await this.#inputView.readBonusNumber();
        this.#validator.validateBonusNumber(
          winningNumbers,
          stringToNumber(bonusNumber)
        );

        break;
      } catch (err) {
        this.#outputView.printError(err.message);
      }
    }

    const lottoGame = new LottoGame(winningNumbers, bonusNumber);
    const statistics = lottoGame.calculateStatistics(lottoList);
    const rate = new Rate(statistics, price);

    this.#outputView.printStatistics(statistics);
    this.#outputView.printRate(rate.getRate());

    const isRetry = await this.#inputView.readIsRetry();
    if (isRetry === "y") {
      await this.run();
    }
  }
}

export default App;
