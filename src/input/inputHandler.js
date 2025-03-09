import SYSTEM_MESSAGE from '../constants/systemMessage.js';
import InputView from '../view/inputView.js';

export const getPriceInput = async () => {
  const priceInput = await InputView.readUserInput(SYSTEM_MESSAGE.PRICE);
  return priceInput;
};

export const getWinningNumberInput = async () => {
  const winningNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.WINNING_NUMBER);
  return winningNumberInput;
};

export const getBonusNumberInput = async () => {
  const bonusNumberInput = await InputView.readUserInput(SYSTEM_MESSAGE.BONUS_NUMBER);
  return bonusNumberInput;
};

export const getRetryInput = async () => {
  const retryInput = await InputView.readUserInput(SYSTEM_MESSAGE.RETRY);
  return retryInput;
};
