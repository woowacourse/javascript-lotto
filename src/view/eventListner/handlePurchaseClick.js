import { DOM } from "../../constants/constants.js";
import { webLottoService } from "../../service/webLottoService.js";

export const handlePurchaseClick = (purchaseMoney) => {
    const lottoList = webLottoService.purchaseLotto(purchaseMoney);
    DOM.winningForm.style.visibility = "visible";

    return lottoList
};