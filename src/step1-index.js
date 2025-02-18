import { purchase } from "./LottoStore.js";
import InputView from "./ui/InputView.js";

class App {
  async start() {
    purchase();
  }
}

export default App;

const app = new App();
app.start();
