import messages from '../constants/messages';
import ValidatorUtils from './ValidatorUtils';

const InputValidator = {
  validateMoneyInput(number) {
    if (!ValidatorUtils.isPositiveInteger(+number)) {
      throw new Error(messages.ERROR.POSITIVE_INTEGER);
    }

    if (!ValidatorUtils.isThousandsOfWon(+number)) {
      throw new Error(messages.ERROR.THOUSANDS_WON);
    }
  },
};

export default InputValidator;
