import AppController from "../Controller/WebController/AppController.js";

class App {
  constructor() {}

  async run() {
    const appController = new AppController();

    appController.run();
  }
}

export default App;
