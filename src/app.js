import readLineAsync from "./util/readLineAsync.js";
import Validator from "./Validator/validator.js";

class App {
  async getPurchaseMoney() {
    const input = await readLineAsync("> 구입금액을 입력해 주세요. ");
    const purchaseMoney = Number(input);
    Validator.validatePurchaseMoney(purchaseMoney);
    return purchaseMoney;
  }

  async getWinningNumbers() {
    const input = await readLineAsync("> 당첨 번호를 입력해 주세요. ");
    const winningNumbers = input.split(",").map((string) => Number(string));
    Validator.validateWinningNumbers(winningNumbers);
    return winningNumbers;
  }

  async getBonusNumber(winningNumbers) {
    const input = await readLineAsync("> 보너스 번호를 입력해 주세요. ");
    const bonusNumber = Number(input);
    Validator.validateBonusNumber(winningNumbers, bonusNumber);
    return bonusNumber;
  }

  async run() {
    const money = await this.getPurchaseMoney();
    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);
  }
}

export default App;
