import Console from "../Console.js";

const InputView = {
  async userInput(query) {
    const inputBuyMoney = await Console.read(query);
  },
};

export default InputView;
