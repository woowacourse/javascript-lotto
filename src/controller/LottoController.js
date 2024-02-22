import InputView from '../views/InputView';
import Console from '../utils/Console';
import LottoPaymentValidator from '../validators/LottoPaymentValidator';
import LottoValidator from '../validators/LottoValidator';
import LottoCalculator from '../domains/LottoCalculator';
import LottoGenerator from '../domains/LottoGenerator';
import OutputView from '../views/OutputView';

class LottoController {
  #lottoNumbers = {};

  constructor() {
    this.#lottoNumbers = {
      winningNumbers: null,
      bonusNumber: null,
    };
  }

  async run() {
    const tickets = await this.readLottoPayment();

    const lottoGenerator = new LottoGenerator(tickets / 1000);
    OutputView.printLottoPayment(tickets / 1000);

    OutputView.printGeneratedLottos(lottoGenerator.generatedLottos);

    this.#lottoNumbers.winningNumbers = await this.readWinningNumbers();
    this.#lottoNumbers.bonusNumber = Number(await this.readBonusNumber());

    const lottoCalculator = new LottoCalculator(
      this.#lottoNumbers,
      lottoGenerator.generatedLottos,
    );
    const lottoStatics = lottoCalculator.lottoStatics;
    const profit = lottoCalculator.calculateTotalProfit(tickets / 1000);

    OutputView.printWinningStatics(lottoStatics);
    OutputView.printTotalProfit(profit);

    await this.reStartLotto();
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
      LottoValidator.winningNumbersValidate(winningNumbers);
      return winningNumbers;
    } catch (error) {
      Console.print(error.message);
      return this.readWinningNumbers();
    }
  }

  async readBonusNumber() {
    try {
      const bonusNumber = await InputView.bonusNumber();
      LottoValidator.bonusNumberValidate(
        this.#lottoNumbers.winningNumbers,
        bonusNumber,
      );
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
    const reStart = await InputView.reStart();
    if (reStart === 'y') {
      this.run();
    }
  }
}

export default LottoController;
