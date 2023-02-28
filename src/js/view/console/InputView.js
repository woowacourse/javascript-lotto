import Console from "../../utils/Console";

const InputView = {
  async readUserInput(message) {
    return await Console.read(message);
  },
};

export default InputView;
