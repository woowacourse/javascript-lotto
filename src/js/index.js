import { initializeEvents } from "./Controller/submitController.js";

class App {
  constructor() {
    initializeEvents();
  }
}

export const app = new App();
