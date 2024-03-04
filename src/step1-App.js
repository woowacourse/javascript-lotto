import ConsoleController from './console-based/controller/ConsoleController';

class ConsoleApp {
  async initConsoleBasedGame() {
    await new ConsoleController().start();
  }
}

export default ConsoleApp;
