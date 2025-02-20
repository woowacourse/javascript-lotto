import { RESTART_ERROR_MESSAGE } from "../constants/constants.js";

const validateRestartConfirm = (input) => {
  const restartConfirm = input.toLowerCase();
  if (!["y", "n"].includes(restartConfirm)) {
    throw new Error(RESTART_ERROR_MESSAGE);
  }
  return restartConfirm;
};

export default validateRestartConfirm;
