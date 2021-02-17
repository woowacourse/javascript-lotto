import { $ } from "./Util/querySelector.js";
import {
  handlePurchaseMountSubmit,
} from "./Controller/submitController.js";
import { onPurchaseResultHidden } from "./Controller/viewController.js";

class App {
  constructor() {
    this.intializeLottos();
    onPurchaseResultHidden();
    $("#purchase-mount-submit").addEventListener("click", handlePurchaseMountSubmit);
  }

  intializeLottos() {
    this.lottos = [];
    this.lottoCount = 0;
  }
}

export const app = new App();