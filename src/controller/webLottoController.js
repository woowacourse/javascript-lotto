import { webInputView } from "../view/webInputView.js"
import { webOutputView } from "../view/webOutputView.js";
import { webLottoService } from "../service/webLottoService.js";
import WinningLotto from "../domain/WinningLotto.js";

const winningForm = document.querySelector(".winning-form")

export const webLottoController = {
    async run() {
        const lottoList = await this.inputPurchaseMoney();
        const winningLotto = await this.inputWinningLotto();
    },

    inputPurchaseMoney() {
        return new Promise((resolve) => {
            webInputView.purchaseMoney((purchaseMoney) => {
                const lottoList = webLottoService.purchaseLotto(purchaseMoney);
                webOutputView.displayLottoNumber(lottoList);
                winningForm.style.visibility = "visible";
                resolve(lottoList);
            });
        });
    },

    inputWinningLotto(){
        return new Promise((resolve) => {
            webInputView.winning((winningNumbers, bonusNumber) => {
                const winningLotto = new WinningLotto(new Lotto(winningNumbers), bonusNumber)
                resolve(winningLotto);
            });
        });
    }
}

