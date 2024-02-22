import { SYMBOL } from "../constants/condition";
import { OUTPUT_MESSAGE } from "../constants/message";

const OutputView = {
  printLottos(lottos) {
    this.print(lottos.length + OUTPUT_MESSAGE.purchaseCount);

    lottos.forEach((lotto) => {
      this.print(lotto.numbers.sort());
    });
    this.print(SYMBOL.space);
  },

  print(message) {
    console.log(message);
  },
};

export default OutputView;
