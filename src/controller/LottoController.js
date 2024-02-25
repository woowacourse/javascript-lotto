import LottoGenerator from '../domains/LottoGenerator';
import LottoCalculator from '../domains/LottoCalculator';

import InputView from '../views/InputView';
import OutputView from '../views/OutputView';

import LottoPurchasePriceValidator from '../validators/LottoPurchasePriceValidator';
import LottoValidator from '../validators/LottoValidator';

import executeWithRetry from '../utils/executeWithRetry';
import splitInput from '../utils/splitInput';

import LOTTO_RULES from '../constants/lotto-rules';

class LottoController {
  #lottoNumbers = {};

  constructor() {
    this.#lottoNumbers = {
      winningNumbers: null,
      bonusNumber: null,
    };
  }

  async run() {
    const ticketCount = await this.initTicketCount();
    const lottoGenerator = new LottoGenerator(ticketCount);
    const generatedLottos = lottoGenerator.generatedLottos;
    this.showGeneratedLottoInfo(ticketCount, generatedLottos);

    await this.#setLottoNumbers();
    await this.calculateAndShowResults(ticketCount, generatedLottos);
    await this.restartLotto();
  }

  async initTicketCount() {
    const lottoPurchasePrice = await this.readLottoPurchasePrice();
    return this.getTicketCount(lottoPurchasePrice);
  }

  async #setLottoNumbers() {
    this.#lottoNumbers.winningNumbers = await this.readWinningNumbers();
    this.#lottoNumbers.bonusNumber = await this.readBonusNumber();
  }

  async calculateAndShowResults(ticketCount, generatedLottos) {
    const lottoCalculator = new LottoCalculator(
      this.#lottoNumbers,
      generatedLottos,
    );

    this.showLottoResult(ticketCount, lottoCalculator);
  }

  async readLottoPurchasePrice() {
    return executeWithRetry(async () => {
      const lottoPurchasePrice = await InputView.lottoPurchasePrice();
      LottoPurchasePriceValidator.validate(lottoPurchasePrice);
      return lottoPurchasePrice;
    });
  }

  async readWinningNumbers() {
    return executeWithRetry(async () => {
      const winningNumbers = await InputView.winningNumbers();
      const splittedNumbers = splitInput(winningNumbers);
      LottoValidator.winningNumbersValidate(splittedNumbers);
      return splittedNumbers;
    });
  }

  async readBonusNumber() {
    return executeWithRetry(async () => {
      const bonusNumber = Number(await InputView.bonusNumber());
      LottoValidator.bonusNumberValidate(
        this.#lottoNumbers.winningNumbers,
        bonusNumber,
      );
      return bonusNumber;
    });
  }

  async restartLotto() {
    OutputView.printNewLine();
    const restart = await InputView.restart();
    if (restart === LOTTO_RULES.restart) {
      this.run();
    }
  }

  getTicketCount(lottoPurchasePrice) {
    return lottoPurchasePrice / LOTTO_RULES.lottoBaseTicketPrice;
  }

  showGeneratedLottoInfo(ticketCount, generatedLottos) {
    OutputView.printTicketCount(ticketCount);
    OutputView.printGeneratedLottos(generatedLottos);
    OutputView.printNewLine();
  }

  showLottoResult(ticketCount, lottoCalculator) {
    const lottoStatics = lottoCalculator.lottoStatics;
    const profit = lottoCalculator.calculateTotalProfit(ticketCount);

    OutputView.printWinningStatics(lottoStatics);
    OutputView.printTotalProfit(profit);
  }
}

export default LottoController;
