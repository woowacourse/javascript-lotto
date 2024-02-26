import RETRY from "../constants/retryConstants.js";
import ERROR_MESSAGE from "../constants/errorMessage.js";

const retryValidation = {
  categories: {
    yesOrNo: {
      errorMessage: ERROR_MESSAGE.YES_OR_NO,
      isValid(input) {
        return input === RETRY.YES || input === RETRY.NO;
      },
    },
  },
};

export default retryValidation;
