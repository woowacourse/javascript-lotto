import { INPUT_MESSAGES, RESTART_KEY } from '../constants';
import { LottoGame, Validator } from '../domains';
import Console from '../utils/Console';

class GameController {
  #lottoGame = new LottoGame();

  async playGame() {
    await this.getPaid();
    await this.getWinningLotto();

    this.#lottoGame.calculateMatchingResult();
    this.#lottoGame.calculateStatistics();

    await this.#restartLottoGame();
  }

  async getPaid() {
    const paymentAmountInput = await Console.readLineAsync(
      INPUT_MESSAGES.paymentAmount,
    );

    this.#lottoGame.insertMoney(paymentAmountInput);
  }

  async getWinningLotto() {
    const lottoNumbersInput = await Console.readLineAsync(
      INPUT_MESSAGES.winningLottoNumbers,
    );

    const bonusNumberInput = await Console.readLineAsync(
      INPUT_MESSAGES.bonusNumber,
    );

    this.#lottoGame.generateWinningLotto(lottoNumbersInput, bonusNumberInput);
  }

  async #restartLottoGame() {
    const restartInput = await Console.readLineAsync(INPUT_MESSAGES.restart);

    Validator.chaeckRestartForm(restartInput);

    if (restartInput === RESTART_KEY.restart) {
      this.#lottoGame = new LottoGame();
      await this.playGame();
    }
  }
}
// 통계 출력
// 통합 테스트
// 파라미터, 속성 검사 ( max:2)
// 리팩토링
// 4시 pr
export default GameController;
