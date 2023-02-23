import Lottos from '../../domain/model/Lottos';
import WinningNumbers from '../../domain/model/WinningNumbers';
// const validator = require('../../domain/validation/validator');
// const inputView = require('../../view/inputView');
// const outputView = require('../../view/outputView');
import PurchasePriceView from '../../view/PurchasePriceView';
import WinningNumbersView from '../../view/WinningNumbersView';
import GameResultView from '../../view/GameResultView';

const {
  PRICE_UNIT,
  RESTART_COMMAND,
  ERROR_MESSAGE,
  CONSOLE_MESSAGE,
} = require('../constants/constants');

export default class LottoGameController {
  constructor() {
    this.model = {
      lottos: undefined,
      winningNumbers: undefined,
    };
    this.view = {
      purchasePriceView: new PurchasePriceView(),
      winningNumbersView: new WinningNumbersView(),
      gameResultView: new GameResultView(),
    };
    this.setEventHandler();
  }

  setEventHandler() {
    this.view.purchasePriceView.addSubmitEvent(
      this.onPriceSubmitHandler.bind(this)
    );
  }

  onPriceSubmitHandler(purchasePriceInput) {
    // const lottos = this.model.getLottos();
    // const { lottoCount, purchasedLottos } = this.purchaseLotto(purchasePrice);
    const lottoCount = this.calculateLottoCount(purchasePriceInput);

    this.model.lottos = new Lottos(lottoCount);
    const lottos = this.model.lottos.getLottos();
    this.view.purchasePriceView.renderPurchaseResult(lottoCount, lottos);

    this.view.purchasePriceView.resetInputValue();

    this.view.winningNumbersView.render();
    this.setEvent2Handler();
  }

  calculateLottoCount(priceInput) {
    return Math.floor(Number(priceInput) / PRICE_UNIT);
  }

  setEvent2Handler() {
    this.view.winningNumbersView.addSubmitEvent(
      this.onWinningNumbersSubmitHandler.bind(this)
    );
  }

  onWinningNumbersSubmitHandler(winningNumbersInput, bonusNumberInput) {
    this.model.winningNumbers = new WinningNumbers(
      winningNumbersInput,
      bonusNumberInput
    );
    this.showGameResult();
  }

  showGameResult() {
    this.calculateRanks();
    const ranks = this.model.lottos.getAllRanks();
    const profitRate = this.model.lottos.getProfitRate();
    this.view.gameResultView.render(ranks, profitRate);
    this.setEvent3Handler();
  }

  calculateRanks() {
    this.model.lottos.calculateAllRanks(
      this.model.winningNumbers.getWinningNumbers(),
      this.model.winningNumbers.getBonusNumber()
    );
  }

  setEvent3Handler() {
    this.view.gameResultView.addClickEvent(
      this.onRestartCommandClickHandler.bind(this)
    );
  }

  onRestartCommandClickHandler() {
    this.model.lottos = null;
    this.model.winningNumbers = null;
    // console.log('clicked');
    window.location.reload();
    this.setEventHandler();
  }

  /*
  inputPurchasePrice() {
    inputView.readPurchasePrice((purchasePriceInput) => {
      const lottoCount = this.calculateLottoCount(purchasePriceInput);
      this.#lottos = new Lottos(lottoCount);

      this.showPurchasedLottos();
    });
  }

  showPurchasedLottos() {
    outputView.printLottoCount(this.#lottos.getLottos().length);
    outputView.printLottoNumbers(this.#lottos.getLottos());

    this.inputWinningNumbers();
  }

  inputWinningNumbers() {
    inputView.readWinningNumbers((winningNumbersInput) => {
      this.#winningNumbers = winningNumbersInput.split(',').map(Number);
      this.inputBonusNumber();
    });
  }

  inputBonusNumber() {
    inputView.readBonusNumber((bonusNumberInput) => {
      try {
        validator.bonusNumber(this.#winningNumbers, bonusNumberInput);
        this.#winningNumbers = new WinningNumbers(
          this.#winningNumbers,
          Number(bonusNumberInput)
        );

        this.showResult();
      } catch (error) {
        Console.print(error.message);
        this.inputBonusNumber();
      }
    });
  }

  showResult() {
    this.#lottos.calculateAllRanks(
      this.#winningNumbers.getWinningNumbers(),
      this.#winningNumbers.getBonusNumber()
    );

    outputView.printStatistics(this.#lottos.getAllRanks());
    outputView.printProfitRate(this.#lottos.getProfitRate());

    this.inputRestartCommand();
  }

  inputRestartCommand() {
    inputView.readRestartCommand((restartCommandInput) => {
      if (validator.isRestartCommandValid(restartCommandInput))
        return restartCommandInput === RESTART_COMMAND.YES
          ? this.restart()
          : Console.close();

      Console.print(ERROR_MESSAGE.RESTART_COMMAND_ERROR);
      this.inputRestartCommand();
    });
  }

  restart() {
    this.#winningNumbers = null;
    this.#lottos = null;

    this.playGame();
  }
  */
}
