import { RESTART_ERROR_MESSAGE, YES, NO } from "../constants/constants.js";

const validateRestartConfirm = (input) => {
  const restartConfirm = input.toLowerCase();
  if (![YES, NO].includes(restartConfirm)) {
    throw new Error(RESTART_ERROR_MESSAGE);
  }
  return restartConfirm;
};

export default validateRestartConfirm;
