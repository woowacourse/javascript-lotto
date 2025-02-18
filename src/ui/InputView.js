import readLineAsync from '../util/readLine.js';
import INPUT_MESSAGE from '../constant/input.js';

const InputView = {
    async readPurchaseAmount() {
        const input = await readLineAsync(INPUT_MESSAGE.AMOUNT);
        
        return input;
    },

    async readWinningNumbers() {
        const input = await readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);

        return input;
    },
}

export default InputView;