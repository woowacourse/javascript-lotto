import { handlePurchaseClick } from "../view/eventListner/handlePurchaseClick.js"
import { handleWinningClick } from "../view/eventListner/handlewinningClick.js"
import { handleRestartClick } from "../view/eventListner/handleRestartClick.js"
import webInputHandler from "../input/webInputHandler.js"
import { webOutputView } from "../view/webOutputView.js"

export class WebLottoController {
    #lottoList

    handlePurchaseClick(event){
        event.preventDefault();
        const purchaseMoney = webInputHandler.purchaseMoney();

        if(purchaseMoney!==null){
            this.#lottoList = handlePurchaseClick(purchaseMoney)
            webOutputView.displayLottoNumber(this.#lottoList);
        }
    }

    handleWinningClic(event){
        event.preventDefault();
        const winningNumber = webInputHandler.winningNumbers();
        const winningLotto = webInputHandler.bonusNumber(winningNumber);

        if(winningNumber!==null && winningLotto !== null){
            handleWinningClick(this.#lottoList, winningLotto)
        }
    }

    handleRestartClick(event){
        handleRestartClick(event)
    }
}