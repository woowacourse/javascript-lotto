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

  async initTicketCount() {
    const lottoPayment = await this.readLottoPayment();
    return this.getTicketCount(lottoPayment);
  }

  async initLottoGenerator(tickets) {
    const lottoGenerator = new LottoGenerator(tickets);
    const generatedLottos = lottoGenerator.generatedLottos;
    outputView.printLottoPayment(tickets);
    outputView.printGeneratedLottos(generatedLottos);
    outputView.printNewLine();
    return generatedLottos;
    //generateRandomLottos 만 return 하면 될듯, 그리고 여기에 out이 있느게 어색..
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
