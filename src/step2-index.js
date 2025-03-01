import "./view/eventListner/modal.js";
import { WebLottoController } from "./controller/webLottoController.js";
import { DOM } from "./utils/DomSelector.js";

export const start = () => {    
    const webLottoController = new WebLottoController()

    DOM.purchaseButton.addEventListener("click", (event)=>webLottoController.handlePurchaseClick(event));
    DOM.winningButton.addEventListener("click", (event)=>webLottoController.handleWinningClick(event));
    DOM.restartButton.addEventListener("click", (event)=>webLottoController.handleRestartClick(event));
}

start();