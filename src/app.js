import readLineAsync from "./util/readLineAsync.js";

class App {
  async getPurchaseMoney() {
    const input = await readLineAsync("구입금액을 입력해 주세요.");
    return input;
  }

  async run() {
    const money = await this.getPurchaseMoney();
  }
}

export default App;
