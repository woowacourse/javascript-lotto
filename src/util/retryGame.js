import LOTTO_RULE from '../constants/rules/lottoRule';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import Console from './Console';
import ERROR_MESSAGE from '../constants/messages/errorMessage';

const validateRetryAnswer = answer => {
  if (!(answer === LOTTO_RULE.LOTTO_RESTART || answer === LOTTO_RULE.LOTTO_EXIT)) {
    throw new Error(ERROR_MESSAGE.IS_NOT_CORRECT_RESPONSE);
  }
};

export const retryGame = async func => {
  try {
    const answer = await InputView.readRetryResponse();
    validateRetryAnswer(answer);

    if (answer === LOTTO_RULE.LOTTO_RESTART) {
      return await func();
    } else if (answer === LOTTO_RULE.LOTTO_EXIT) {
      OutputView.printExitLotto();
    }
  } catch (err) {
    Console.print(err.message);
    return await retryGame(func);
  }
};
