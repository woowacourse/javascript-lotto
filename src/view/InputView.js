import { GAME_MESSAGE } from '../constant/gameMessage';
import handleIO from '../util/handleIO';

const InputView = {
  async readPurchaseAmount() {
    const purchaseAmount = await handleIO.read(GAME_MESSAGE.PROMPT_PURCHASE_AMOUNT);
    return purchaseAmount;
  },

  async readWinningNumbers() {
    const winningNumbers = await handleIO.read(GAME_MESSAGE.PROMPT_WINNING_NUMBERS);
    return winningNumbers;
  },

  async readBonusNumber() {
    const bonusNumber = await handleIO.read(GAME_MESSAGE.PROMPT_BONUS_NUMBER);
    return bonusNumber;
  },

  async readRestartCommand() {
    const restartCommand = await handleIO.read(GAME_MESSAGE.PROMPT_RESTART_COMMAND);
    return restartCommand;
  },
};

export default InputView;
