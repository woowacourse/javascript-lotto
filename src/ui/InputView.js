import readLineAsync from "../util/readLine.js";
import INPUT_MESSAGE from "../constant/input.js";

const InputView = {
  async readPurchaseAmount() {
    // return await readLineAsync(INPUT_MESSAGE.AMOUNT);
    return document.getElementById("input-purchase-amount").value;
  },

  async readWinningNumbers() {
    // return await readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
    // 사용자가 입력한 당첨 번호들을 가져와서 ,로 묶어서 return? 
    
  },

  async readBonusNumber() {
    // return await readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
  },

  async readRestart() {
    // return await readLineAsync(INPUT_MESSAGE.RESTART);
  },
};

export default InputView;
