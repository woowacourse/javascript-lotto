import { handlePurchaseClick } from "../view/eventListner/handlePurchaseClick.js"
import { handleWinningClick } from "../view/eventListner/handlewinningClick.js"
import { handleRestartClick } from "../view/eventListner/handleRestartClick.js"

export class WebLottoController {
    #lottoList

    handlePurchaseClick(event){
        this.#lottoList = handlePurchaseClick(event)
    }

    handleWinningClick(event){
        handleWinningClick(event, this.#lottoList)
    }

    handleRestartClick(event){
        handleRestartClick(event)
    }
}