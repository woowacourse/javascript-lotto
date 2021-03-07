import CashContainer from "./components/CashContainer.js";
import LottoDetailContainer from "./components/LottoDetailContainer.js";
import PurchaseModalContainer from "./components/PurchaseModalContainer.js";
import ResultModalContainer from "./components/ResultModalContainer.js";
import WinningNumberContainer from "./components/WinningNumberContainer.js";

class App {
  constructor(store) {
    this.initalizeContainers();
    this.mount();
    this.subscribe(store);
  }

  initalizeContainers() {
    this.Containers = [
      new CashContainer(),
      new PurchaseModalContainer(),
      new LottoDetailContainer(),
      new WinningNumberContainer(),
      new ResultModalContainer(),
    ];
  }

  mount() {
    this.Containers.forEach((Container) => {
      Container.Presentational.setEventListeners();
    });
  }

  subscribe(store) {
    this.Containers.forEach((Container) => {
      Container.subscribe(store);
    });
  }
}

export default App;
