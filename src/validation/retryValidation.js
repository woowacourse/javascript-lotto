import ERROR_MESSAGE from "../constants/errorMessage.js";

const retryValidation = {
  categories: {
    yesOrNo: {
      errorMessage: ERROR_MESSAGE.YES_OR_NO,
      isValid(input) {
        return input === "y" || input === "n";
      },
    },
  },
};

export default retryValidation;
