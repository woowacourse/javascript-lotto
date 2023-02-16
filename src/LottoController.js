const { OUTPUT_MESSAGE_METHOD } = require('./constant/Message');
const Comparer = require('./domain/Comparer');
const LottoMachine = require('./domain/LottoMachine');
const ProfitCalculator = require('./domain/ProfitCaculator');
const Validator = require('./domain/Validator');
const Console = require('./util/Console');
const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');

class LottoController {
  #lottos;

  #winningNumber;

  #bonusNumber;

  async start() {
    console.log(OUTPUT_MESSAGE_METHOD.RANK('SECOND', 1));
    console.log(OUTPUT_MESSAGE_METHOD.RANK('THIRD', 2));
    const purchaseAmount = await this.inputPurchaseAmount();
    this.issueLottos(purchaseAmount);

    await this.inputWinningNumber();
    await this.inputBonusNumber();

    const ranking = new Comparer(this.#winningNumber, this.#bonusNumber, this.#lottos).getRanking();
    const profitRate = new ProfitCalculator(ranking).getProfitRate(purchaseAmount);

    OutputView.printRanking(ranking);
    OutputView.printProfitRate(profitRate);

    this.inputRestartCommand();
  }

  async inputPurchaseAmount() {
    try {
      const purchaseAmount = await InputView.readPurchaseAmount();
      Validator.purchaseAmount(purchaseAmount);
      return +purchaseAmount;
    } catch (error) {
      console.log(error.message);
      this.inputPurchaseAmount();
    }
  }

  // 발행하는 과정
  issueLottos(purchaseAmount) {
    const lottoMachine = new LottoMachine(purchaseAmount);
    OutputView.printPurchaseQuantity(lottoMachine.getQuantity());
    this.#lottos = Array.from({ length: lottoMachine.getQuantity() }, () =>
      lottoMachine.issueLotto(),
    );
    OutputView.printLottos(this.#lottos);
  }

  async inputWinningNumber() {
    try {
      const winningNumber = await InputView.readWinningNumber();
      Validator.winningNumber(winningNumber);
      this.#winningNumber = winningNumber.split(',').map(Number);
    } catch (error) {
      console.log(error.message);
      this.inputWinningNumber();
    }
  }

  async inputBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      Validator.bonusNumber(bonusNumber, this.#winningNumber);
      this.#bonusNumber = +bonusNumber;
    } catch (error) {
      console.log(error.message);
      this.inputBonusNumber();
    }
  }

  async inputRestartCommand() {
    try {
      const restartCommand = await InputView.readRestartCommand();
      Validator.restartCommand(restartCommand);
      this.processRestartCommand(restartCommand);
    } catch (error) {
      console.log(error.message);
      this.inputRestartCommand();
    }
  }

  // 재입력 커맨드 동작
  processRestartCommand(restartCommand) {
    if (restartCommand === 'y') {
      this.start();
    }
    if (restartCommand === 'n') {
      Console.close();
    }
  }
}

module.exports = LottoController;
