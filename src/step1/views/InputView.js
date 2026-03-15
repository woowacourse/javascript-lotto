import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readStringWithMsg(message) {
    const input = await Console.readLineAsync(message);
    return input;
  },
};

export default InputView;
