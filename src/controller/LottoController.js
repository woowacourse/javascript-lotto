import LottoGenerator from '../domains/LottoGenerator';
import LottoCalculator from '../domains/LottoCalculator';

import InputView from '../views/InputView';
import OutputView from '../views/OutputView';

import LottoPurchasePriceValidator from '../validators/LottoPurchasePriceValidator';
import LottoValidator from '../validators/LottoValidator';
import executeWithRetry from '../utils/executeWithRetry';

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
    const generatedLottos = await this.initLottoGenerator(ticketCount);
    await this.initLottoNumbers();
    await this.initLottoCalculator(ticketCount, generatedLottos);
    await this.reStartLotto();
  }

  async initTicketCount() {
    const lottoPurchasePrice = await this.readLottoPurchasePrice();
    return this.getTicketCount(lottoPurchasePrice);
  }

  async initLottoGenerator(tickets) {
    const lottoGenerator = new LottoGenerator(tickets);
    OutputView.printTicketCount(tickets);
    OutputView.printGeneratedLottos(lottoGenerator.generatedLottos);
    OutputView.printNewLine();
    return lottoGenerator;
  }

  async initLottoNumbers() {
    this.#lottoNumbers.winningNumbers = await this.readWinningNumbers();
    OutputView.printNewLine();

    this.#lottoNumbers.bonusNumber = await this.readBonusNumber();
    OutputView.printNewLine();
  }

  async initLottoCalculator(tickets, lottoGenerator) {
    const lottoCalculator = new LottoCalculator(
      this.#lottoNumbers,
      lottoGenerator.generatedLottos,
    );
    const lottoStatics = lottoCalculator.lottoStatics;
    const profit = lottoCalculator.calculateTotalProfit(tickets);
    OutputView.printWinningStatics(lottoStatics);
    OutputView.printTotalProfit(profit);
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
      const splittedNumbers = this.splitInput(winningNumbers);
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

  async reStartLotto() {
    OutputView.printNewLine();
    const reStart = await InputView.reStart();
    if (reStart === LOTTO_RULES.reStart) {
      this.run();
    }
  }

  getTicketCount(lottoPurchasePrice) {
    return lottoPurchasePrice / LOTTO_RULES.lottoBaseTicketPrice;
  }

  splitInput(winningNumbers) {
    return winningNumbers.split(',').map((number) => Number(number));
  }
}

export default LottoController;
