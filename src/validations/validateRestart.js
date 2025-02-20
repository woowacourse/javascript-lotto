import { ERROR_MESSAGE } from "../constants/error.js";

export const validateFormat = (shouldRestart) => {
  if (shouldRestart !== "y" && shouldRestart !== "n") {
    throw new Error(ERROR_MESSAGE.INVALID_RESTART_FORMAT);
  }
};

const validateRestart = (shouldRestart) => {
  const lowered = shouldRestart.toLowerCase();
  validateFormat(lowered);

  return lowered === "y";
};

export default validateRestart;
