import { INPUT_MESSAGES, RESTART_KEY } from '../constants';
import LottoGame from '../domains/LottoGame';
import Console from '../utils/Console';

class GameController {
  #lottoGame = new LottoGame();

  // 역할
  // LottoGame을 실행한다.
  // 게임 종료 후 게임 재시작/종료 입력을 받는다.
  // 게임 재시작/종료 입력값에 따라서 재시작/종료 여부를 결정한다.

  async #restartLottoGame() {
    const resetInput = await Console.readLineAsync(INPUT_MESSAGES.restart);
    // 유효성
    const { restart, end } = RESTART_KEY;
    const regex = new RegExp(`[${restart}${end}]`);
    const isValidInput = regex.test(resetInput);

    if (!isValidInput) throw new Error('재시작 입력값 오류');

    // restart
    if (resetInput === restart) {
      this.#lottoGame = new LottoGame();
      this.playGame();
    }
  }

  async playGame() {
    const paymentAmountInput = await Console.readLineAsync(
      INPUT_MESSAGES.paymentAmount,
    );

    this.#lottoGame.insertMoney(paymentAmountInput);

    const lottoNumbersInput = await Console.readLineAsync(
      INPUT_MESSAGES.winningLottoNumbers,
    );

    const bonusNumberInput = await Console.readLineAsync(
      INPUT_MESSAGES.bonusNumber,
    );

    this.#lottoGame.generateWinningLotto(lottoNumbersInput, bonusNumberInput);

    this.#lottoGame.calculateMatchingResult();

    this.#lottoGame.calculateStatistics();

    await this.#restartLottoGame();
  }
}

export default GameController;
