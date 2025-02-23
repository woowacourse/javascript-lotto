const InputHandler = {
  async getValidatedInput(inputFunction, validationFunction, ...args) {
    while (true) {
      try {
        const input = await inputFunction();
        validationFunction(input, ...args);
        return input;
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};

export default InputHandler;
