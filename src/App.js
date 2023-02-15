import Console from "./Console.js";
import Validations from "./Validations.js";
import InputView from "./view/InputView.js";

class App {
  async play() {
    await this.inputBuyMoney();
    Console.close();
  }

  async inputBuyMoney() {
    const buyMoney = await InputView.userInput("구입금액을 입력해 주세요.");
  }
}
export default App;
