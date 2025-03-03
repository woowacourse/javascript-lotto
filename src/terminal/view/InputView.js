import { readLineAsync } from "../../common/util/readLineAsync.js";

const InputView = {
  async readUserInput(message) {
    return await readLineAsync(message);
  },
};
export default InputView;
