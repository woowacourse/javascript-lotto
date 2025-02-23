import { Y_OR_NO_ERROR_MESSAGE, YES, NO } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';

const reStartValidator = {
  isYesOrNo(input) {
    return input === YES || input === NO;
  },
};

const validateYorN = (input) => {
  if (!reStartValidator.isYesOrNo(input)) {
    throw new Error(Y_OR_NO_ERROR_MESSAGE);
  }
};

const validateReStart = (input) => runValidators([validateYorN], input);

export default validateReStart;
