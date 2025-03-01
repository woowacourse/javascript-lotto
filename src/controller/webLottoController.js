import { webInputView } from "../view/webInputView.js"
import { webOutputView } from "../view/webOutputView.js";
import { webLottoService } from "../service/webLottoService.js";

export const webLottoController = {
    run(){
        webInputView.purchaseMoney((purchaseMoney) => {
            webOutputView.displayLottoNumber(webLottoService.purchaseLotto(purchaseMoney));
        });
    }
}
