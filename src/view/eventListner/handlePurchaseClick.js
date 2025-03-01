import { DOM } from "../../utils/DomSelector.js";
import { webLottoService } from "../../service/webLottoService.js";

export const handlePurchaseClick = (purchaseMoney) => {
    const lottoList = webLottoService.purchaseLotto(purchaseMoney);
    DOM.purchaseButton.disabled = true;
    DOM.inputPrice.disabled = true;
    DOM.winningForm.style.visibility = "visible";
    DOM.winningNumberInputs[0].focus();

    return lottoList
};