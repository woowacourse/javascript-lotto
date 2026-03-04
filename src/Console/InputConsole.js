import { MissionUtils } from "@woowacourse/mission-utils";

const InputConsole = {
  async readPurchasePrice() {
    const purchasePrice =
      await MissionUtils.Console.readLineAsync("> 구입금액을 입력해 주세요.");
    return purchasePrice;
  },
};

export default InputConsole;
