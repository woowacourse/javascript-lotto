import { webLottoService } from "../../service/webLottoService.js";
import { webOutputView } from "../webOutputView.js";
import { openModal } from "./modal.js";

export const handleWinningClick = (lottoList, winningLotto) => {
    openModal();
    const lottoResult = webLottoService.calculateLottoResult(lottoList, winningLotto);
    webOutputView.result(lottoResult);
    const winningRate = webLottoService.calculateWinningRate(lottoResult, lottoList);
    webOutputView.winningRate(winningRate);
};