import InputView from "./view/InputView.js";
class Controller {
  async start() {
    await InputView.purchaseAmount();
  }
}
export default Controller;
