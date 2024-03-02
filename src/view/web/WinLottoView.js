import {$, $$} from "../../util/domSelector";

const WinLottoView = {
    resetWinningLottoNumbers() {
        $$('.number-input').forEach((input) => (input.value = ''));
        $('.number-input').focus();
    },
}

export default WinLottoView;