import { RESTART_ERROR_MESSAGE, YES, NO } from "../constants/constants.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";

const validateRestartConfirm = (input) => {
  const restartConfirm = input.toLowerCase();
  const isValidRestartConfirm = ![YES, NO].includes(restartConfirm);
  throwIfInvalid(isValidRestartConfirm, RESTART_ERROR_MESSAGE);

  return restartConfirm;
};

export default validateRestartConfirm;
