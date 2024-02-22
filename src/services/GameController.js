import { INPUT_MESSAGES, RESTART_KEY } from '../constants';
import { LottoGame, Validator } from '../domains';
import Console from '../utils/Console';
import InputView from '../views/InputView';
import InputController from './InputController';

class GameController {
  #lottoGame = new LottoGame();

  async playGame() {
    await this.#getPaid();
    await this.#generateWinning();

    this.#lottoGame.calculateMatchingResult();
    this.#lottoGame.calculateStatistics();

    await this.#restartLottoGame();
  }

  async #getPaid() {
    await InputController.retryOnInvalidInput(async () => {
      const paymentAmountInput = await InputView.readPaymentAmount();

      this.#lottoGame.insertMoney(paymentAmountInput);
    });
  }

  async #generateWinning() {
    await this.#getValidWinningLottoNumbers();
    await this.#getValidBonusNumber();
  }

  async #getValidWinningLottoNumbers() {
    return await InputController.retryOnInvalidInput(async () => {
      //입력값 가져오기
      const lottoNumbersInput = await InputView.readWinningLottoNumbers();
      // 유효성 검사
      this.#lottoGame.winningLottoNumbers = lottoNumbersInput;
    });
  }

  async #getValidBonusNumber() {
    return await InputController.retryOnInvalidInput(async () => {
      //입력값 가져오기
      const bonusNumberInput = await InputView.readBonusNumber();
      // 유효성 검사
      this.#lottoGame.bonusNumber = bonusNumberInput;
    });
  }

  async #restartLottoGame() {
    const restartInput = await InputController.retryOnInvalidInput(async () => {
      const restartInput = await InputView.readRestart();

      Validator.chaeckRestartForm(restartInput);
    });

    if (restartInput === RESTART_KEY.restart) {
      this.#lottoGame = new LottoGame();
      await this.playGame();
    }
  }
}

export default GameController;
