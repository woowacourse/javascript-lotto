import { DOM } from "../../utils/DomSelector.js";
import { lottoService } from "../../service/lottoService.js";

export const handlePurchaseClick = (purchaseMoney) => {
    const lottoList = lottoService.purchaseLotto(purchaseMoney);
    DOM.purchaseButton.disabled = true;
    DOM.inputPrice.disabled = true;
    DOM.winningForm.style.visibility = "visible";
    DOM.winningNumberInputs[0].focus();

    return lottoList
};