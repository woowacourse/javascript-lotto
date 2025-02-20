import readLineAsync from "../utils/readLineAsync.js";

const Input = {
  readPurchaseAmount() {
    return readLineAsync("> 구입금액을 입력해 주세요. ");
  },

  readWinningNumbers() {
    return readLineAsync("\n> 당첨 번호를 입력해 주세요. ");
  },

  readBonusNumber() {
    return readLineAsync("\n> 보너스 번호를 입력해 주세요. ");
  },

  readRestartConfirm() {
    return readLineAsync("\n> 다시 시작하시겠습니까? (y/n) ");
  },
};

export default Input;
