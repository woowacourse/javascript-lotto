import { DOM } from "../../constants/constants.js";
import { webOutputView } from "../webOutputView.js";
import { webLottoService } from "../../service/webLottoService.js";

export const handlePurchaseClick = (event) => {
    event.preventDefault();
    const lottoList = webLottoService.purchaseLotto(DOM.inputPrice.value);
    webOutputView.displayLottoNumber(lottoList);
    DOM.winningForm.style.visibility = "visible";
    
    return lottoList
};
