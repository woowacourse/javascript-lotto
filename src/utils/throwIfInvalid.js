const throwIfInvalid = async (inputFn, validateFn) => {
  while (true) {
    try {
      const input = await inputFn();
      return validateFn(input);
    } catch (error) {
      console.log(error.message);
    }
  }
};

export default throwIfInvalid;
