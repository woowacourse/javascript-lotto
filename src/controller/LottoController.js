import LottoGenerator from '../domains/LottoGenerator';
import LottoCalculator from '../domains/LottoCalculator';
import InputView from '../views/InputView';
import OutputView from '../views/OutputView';
import Console from '../utils/Console';
import LottoPaymentValidator from '../validators/LottoPaymentValidator';
import LottoValidator from '../validators/LottoValidator';

const { winningNumbersValidate, bonusNumberValidate } = LottoValidator;

class LottoController {
  #lottoNumbers = {};

  constructor() {
    this.#lottoNumbers = {
      winningNumbers: null,
      bonusNumber: null,
    };
  }

  async run() {
    const tickets = await this.initTicketCount();
    const lottoGenerator = await this.initLottoGenerator(tickets);
    await this.initLottoNumbers();
    await this.initLottoCalculator(tickets, lottoGenerator);
    await this.reStartLotto();
  }

  async initTicketCount() {
    const tickets = await this.readLottoPayment();
    return this.getTicketCount(tickets);
  }

  async initLottoGenerator(tickets) {
    const lottoGenerator = new LottoGenerator(tickets);
    OutputView.printLottoPayment(tickets);
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

  getTicketCount(lottoPayment) {
    return lottoPayment / 1000;
  }

  async readLottoPayment() {
    try {
      const lottoPayment = await InputView.lottoPayment();
      LottoPaymentValidator.validate(lottoPayment);
      return lottoPayment;
    } catch (error) {
      Console.print(error.message);
      return this.readLottoPayment();
    }
  }

  async readWinningNumbers() {
    try {
      const winningNumbers = this.splitInput(await InputView.winningNumbers());
      winningNumbersValidate(winningNumbers);
      return winningNumbers;
    } catch (error) {
      Console.print(error.message);
      return this.readWinningNumbers();
    }
  }

  async readBonusNumber() {
    try {
      const bonusNumber = Number(await InputView.bonusNumber());
      bonusNumberValidate(this.#lottoNumbers.winningNumbers, bonusNumber);
      return bonusNumber;
    } catch (error) {
      Console.print(error.message);
      return await this.readBonusNumber();
    }
  }

  splitInput(winningNumbers) {
    return winningNumbers.split(',').map((number) => Number(number));
  }

  async reStartLotto() {
    OutputView.printNewLine();

    const reStart = await InputView.reStart();
    if (reStart === 'y') {
      this.run();
    }
  }
}

export default LottoController;
