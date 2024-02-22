import ERROR_MESSAGE from "../constants/errorMessage.js";

const retryValidation = {
  categories: {
    yesOrNo: {
      errorMessage: ERROR_MESSAGE.yesOrNo,
      isValid(input) {
        return input === "y" || input === "n";
      },
    },
  },
};

export default retryValidation;
