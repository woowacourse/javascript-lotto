import { Console } from '../utils';

const InputController = {
  async retryOnInvalidInput(action) {
    try {
      await action();
    } catch (err) {
      Console.print(err.message);
      await this.retryOnInvalidInput(action);
    }
  },
};

export default InputController;
