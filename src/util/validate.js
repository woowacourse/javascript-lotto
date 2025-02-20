export const validateRestart = (answer) => {
  if (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "n") {
    throw new Error();
  }
};

