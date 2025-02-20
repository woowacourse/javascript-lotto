import InputView from "./view/InputView.js";
class Controller {
  async start() {
    await InputView.purchaseAmount();
    await InputView.winningNumbers();
    await InputView.bonusNumber();
    await InputView.restart();
  }
}
export default Controller;
