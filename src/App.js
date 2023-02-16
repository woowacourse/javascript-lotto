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
    try {
      this.validateBuyMoney(buyMoney);
    } catch (e) {
      Console.print(e);
      await this.inputBuyMoney();
    }
  }

  validateBuyMoney(buyMoney) {
    if (!Validations.isBuyMoneyNumber(buyMoney)) {
      throw new Error("숫자만 입력할 수 있습니다.");
    }
    if (!Validations.isDevidedByThousand(buyMoney)) {
      throw new Error("1000원 단위로 입력해주세요.");
    }
    if (!Validations.isPositiveInteger(buyMoney)) {
      throw new Error("구매 금액은 양의 정수여야 합니다.");
    }
  }
}

export default App;
