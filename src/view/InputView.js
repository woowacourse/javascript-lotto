import Console from "../Console.js";

const InputView = {
  async userInput(query) {
    const buyMoney = await Console.read(query);
    return buyMoney;
  },
};

export default InputView;
