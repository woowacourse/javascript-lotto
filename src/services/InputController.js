const InputController = {
  async retryOnInvalidInput(action, errCallback) {
    try {
      await action();
    } catch (err) {
      errCallback(err);
      await this.retryOnInvalidInput(action, errCallback);
    }
  },
};

export default InputController;
