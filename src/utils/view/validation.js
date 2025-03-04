export const validateInput = ({ validatorList, errorHandler }) => {
  try {
    validatorList.forEach((validator) => validator());
    return true;
  } catch (error) {
    errorHandler(error);
    return false;
  }
};
