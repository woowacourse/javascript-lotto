import { YES, NO } from "../constants/validateConstants.js";
import { RESTART_ERROR_MESSAGE } from "../constants/errorConstants.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";

const validateRestartConfirm = (input) => {
  const restartConfirm = input.toLowerCase();
  const isValidRestartConfirm = ![YES, NO].includes(restartConfirm);
  throwIfInvalid(isValidRestartConfirm, RESTART_ERROR_MESSAGE);

  return restartConfirm;
};

export default validateRestartConfirm;
