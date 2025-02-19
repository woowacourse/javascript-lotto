import readLineAsync from "../utils/readLineAsync.js";

const InputView = {
  enterPurchasePrice: async function () {
    return await readLineAsync("> 구입금액을 입력해 주세요. ");
  },

  enterWinningNumbers: async function () {
    return await readLineAsync("> 당첨 번호를 입력해 주세요. ");
  },

  enterBonusNumber: async function () {
    return await readLineAsync("\n> 보너스 번호를 입력해 주세요. ");
  },

  enterRestart: async function () {
    return await readLineAsync("\n> 다시 시작하시겠습니까? (y/n) ");
  },
};

export default InputView;
