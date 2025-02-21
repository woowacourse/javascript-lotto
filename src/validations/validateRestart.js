import { ERROR_MESSAGE } from "../constants/error.js";

export const validateFormat = (shouldRestart) => {
  return shouldRestart === "y" || shouldRestart === "n";
};

const validateRestart = (shouldRestart) => {
  const lowered = shouldRestart.toLowerCase();
  if (!validateFormat(lowered))
    throw new Error(ERROR_MESSAGE.INVALID_RESTART_FORMAT);

  return lowered === "y";
};

export default validateRestart;
