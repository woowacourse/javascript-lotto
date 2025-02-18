import readLineAsync from "../utils/readLineAsync.js";

const Input = {
  readPurchaseAmount() {
    return readLineAsync("> 구입금액을 입력해 주세요. ");
  },

  readWinningNumbers() {
    return readLineAsync("> 당첨 번호를 입력해 주세요. ");
  },
};

export default Input;
