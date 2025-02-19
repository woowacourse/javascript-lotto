import readLineAsync from "./util/readLineAsync.js";

class App {
  async getPurchaseMoney() {
    const input = await readLineAsync("> 구입금액을 입력해 주세요. ");
    return input;
  }

  async getWinningNumbers() {
    const input = await readLineAsync("> 당첨 번호를 입력해 주세요. ");
    return input;
  }

  async getBonusNumber() {
    const input = await readLineAsync("> 보너스 번호를 입력해 주세요. ");
    return input;
  }

  async run() {
    const money = await this.getPurchaseMoney();
    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber();
  }
}

export default App;
