import Console from "./Console.js";
import InputView from "./view/InputView.js";

class App {
    async play() {
      await InputView.userInput("구입금액을 입력해 주세요.");
      Console.close();
    }
  }

export default App;