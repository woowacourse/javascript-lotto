import readLineAsync from "../utils/readLineAsync.js";

const Input = {
  readPurchaseAmount() {
    return readLineAsync("> 구입금액을 입력해 주세요. ");
  },
};

export default Input;
