import SubmitController from "./Controller/SubmitController.js";

class App {
  constructor() {
    this.submitController = new SubmitController();
    this.submitController.initializeEvents();
  }
}

const app = new App();
