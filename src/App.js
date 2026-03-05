import InputConsole from "./Console/InputConsole.js";

class App {
  async run() {
    // 구입할 로또 금액 입력받기
    const purchasePrice = await InputConsole.readPurchasePrice();

    const winningNumbers = await InputConsole.readWinningNumbers();
  }
}

export default App;
