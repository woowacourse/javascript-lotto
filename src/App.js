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
    let isRetry = "y";

    while (isRetry === "y") {
      await this.#playGameOnce();
      isRetry = await this.#inputView.readIsRetry();
    }
  }

  #playGameOnce = async () => {
    const price = await this.#retryReadValue(
      () => this.#inputView.readPrice(),
      (v) => this.#validator.validatePrice(v)
    );

    const lottoList = new LottoList(price / 1000);
    this.#outputView.printAmount(price);
    this.#outputView.printLottos(lottoList.getLottoList());

    const winningNumbers = await this.#retryReadValue(
      () => this.#inputView.readLottoNumbers(),
      (v) => this.#validator.validateLottoNumbers(v),
      parsingNumbers
    );

    const bonusNumber = await this.#retryReadValue(
      () => this.#inputView.readBonusNumber(),
      (v) => this.#validator.validateBonusNumber(winningNumbers, v),
      stringToNumber
    );

    const lottoGame = new LottoGame(winningNumbers, bonusNumber);
    const statistics = lottoGame.calculateStatistics(lottoList);
    const rate = new Rate(statistics, price);

    this.#outputView.printStatistics(statistics);
    this.#outputView.printRate(rate.getRate());
  };

  #retryReadValue = async (
    readMethod,
    validateMethod,
    transformMethod = (v) => v
  ) => {
    try {
      const raw = await readMethod();
      const value = transformMethod(raw);

      validateMethod(value);

      return value;
    } catch (err) {
      this.#outputView.printError(err.message);
      return this.#retryReadValue(readMethod, validateMethod, transformMethod);
    }
  };
}

export default App;
