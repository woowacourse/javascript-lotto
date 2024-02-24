import LottoGenerator from '../domains/LottoGenerator';
import LottoCalculator from '../domains/LottoCalculator';
import inputView from '../views/inputView';
import outputView from '../views/outputView';
import LottoPaymentValidator from '../validators/LottoPaymentValidator';
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

  outputGeneratedLotto(tickets, generatedLottos) {
    outputView.printLottoPayment(tickets);
    outputView.printGeneratedLottos(generatedLottos);
    outputView.printNewLine();
  }

  async initTicketCount() {
    const lottoPayment = await this.readLottoPayment();
    return this.getTicketCount(lottoPayment);
  }

  async initLottoGenerator(tickets) {
    const lottoGenerator = new LottoGenerator(tickets);
    const generatedLottos = lottoGenerator.generatedLottos;

    this.outputGeneratedLotto(tickets, generatedLottos);

    return generatedLottos;
  }

  async initLottoNumbers() {
    this.#lottoNumbers.winningNumbers = await this.readWinningNumbers();
    outputView.printNewLine();

    this.#lottoNumbers.bonusNumber = await this.readBonusNumber();
    outputView.printNewLine();
  }

  async initLottoCalculator(tickets, generatedLottos) {
    const lottoCalculator = new LottoCalculator(
      this.#lottoNumbers,
      generatedLottos,
    );
    const lottoStatistics = lottoCalculator.lottoStatistics;
    const profit = lottoCalculator.calculateTotalProfit(tickets);
    this.outputCalculatedLotto(lottoStatistics, profit);
  }

  outputCalculatedLotto(lottoStatistics, profit) {
    outputView.printWinningStatistics(lottoStatistics);
    outputView.printTotalProfit(profit);
  }

  async readLottoPayment() {
    return executeWithRetry(async () => {
      const lottoPayment = await inputView.lottoPayment();
      LottoPaymentValidator.validate(lottoPayment);
      return lottoPayment;
    });
  }

  async readWinningNumbers() {
    return executeWithRetry(async () => {
      const winningNumbers = await inputView.winningNumbers();
      const splittedNumbers = this.splitInput(winningNumbers);
      LottoValidator.validateWinningNumbers(splittedNumbers);
      return splittedNumbers;
    });
  }

  async readBonusNumber() {
    return executeWithRetry(async () => {
      const bonusNumber = Number(await inputView.bonusNumber());
      LottoValidator.validateBonusNumber(
        this.#lottoNumbers.winningNumbers,
        bonusNumber,
      );
      return bonusNumber;
    });
  }

  async reStartLotto() {
    outputView.printNewLine();
    const reStart = await inputView.reStart();
    if (reStart === 'y') {
      this.run();
    }
  }

  getTicketCount(lottoPayment) {
    return lottoPayment / LOTTO_RULES.lottoBaseTicketPrice;
  }

  splitInput(winningNumbers) {
    return winningNumbers.split(',').map((number) => Number(number));
  }
}

export default LottoController;
