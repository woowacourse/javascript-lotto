import { webLottoService } from "../../service/webLottoService.js";
import { webOutputView } from "../webOutputView.js";
import { openModal } from "./modal.js";
import { DOM } from "../../constants/constants.js";

export const handleWinningClick = (lottoList, winningLotto) => {
    openModal();
    DOM.winningNumberInputs.forEach(input => {
        input.disabled = true;
    });
    DOM.bonusInput.disabled = true;
    const lottoResult = webLottoService.calculateLottoResult(lottoList, winningLotto);
    webOutputView.result(lottoResult);
    const winningRate = webLottoService.calculateWinningRate(lottoResult, lottoList);
    webOutputView.winningRate(winningRate);
};