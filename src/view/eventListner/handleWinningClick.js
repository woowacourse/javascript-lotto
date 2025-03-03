import { openModal } from "./modal.js";
import { DOM } from "../../utils/DomSelector.js";
import { lottoService } from "../../service/lottoService.js";

export const handleWinningClick = (lottoList, winningLotto) => {
    openModal();
    DOM.winningNumberInputs.forEach(input => {
        input.disabled = true;
    });
    DOM.bonusInput.disabled = true;
    const lottoResult = lottoService.calculateLottoResult(lottoList, winningLotto);
    const winningRate = lottoService.calculateWinningRate(lottoList, lottoResult);

    return {lottoResult:lottoResult, winningRate:winningRate}
};