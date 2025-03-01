import Lotto from "../../domain/Lotto.js";
import WinningLotto from "../../domain/WinningLotto.js";
import { DOM } from "../../constants/constants.js";
import { webLottoService } from "../../service/webLottoService.js";
import { webOutputView } from "../webOutputView.js";

export const handleWinningClick = (event, lottoList) => {
    event.preventDefault();
    
    const winningNumbers = Array.from(DOM.winningNumberInputs).map(input => Number(input.value));
    const bonusNumber = Number(DOM.bonusInput.value);
    const winningLotto=new WinningLotto(new Lotto(winningNumbers), bonusNumber)

    const lottoResult = webLottoService.calculateLottoResult(lottoList, winningLotto);
    webOutputView.result(lottoResult);
    const winningRate = webLottoService.calculateWinningRate(lottoResult, lottoList);
    webOutputView.winningRate(winningRate);
};
