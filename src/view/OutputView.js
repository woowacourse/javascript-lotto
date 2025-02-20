import Console from "../utils/Console.js";
const OutputView = {
  purchaseCount(count) {
    Console.print(`${count}개를 구매했습니다.`);
  },
  lottoPack(lottoPack) {
    lottoPack.lottos.forEach((lotto) => {
      Console.print(`[${lotto.lottoNumbers.join(", ")}]`);
    });
  },
};
export default OutputView;
