const throwIfInvalid = (condition, errorMessage) => {
  if (condition) {
    throw new Error(errorMessage);
  }
};

export default throwIfInvalid;
