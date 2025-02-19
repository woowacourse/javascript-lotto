import { OUTPUT } from "../constants/message.js";
import { LOTTO_STATUS } from "../constants/lotto.js";

const Output = {
  print: (message) => {
    console.log(message);
  },
  printLottoCount: (count) => {
    console.log(`${count}${OUTPUT.BUY_COUNT}\n`);
  },
  printLottoNumber: (lottos) => {
    lottos.forEach((lotto) => {
      console.log(`[ ${lotto.join(", ")} ]\n`);
    });
  },
  printWinningHistory: (history) => {
    Object.entries(history).forEach(([rank, count]) => {
      const { REWORD, COUNT: MATCH_COUNT } = LOTTO_STATUS.find(
        (status) => status.RANK === Number(rank)
      );
      if (Number(rank) === 2) {
        return console.log(
          `${MATCH_COUNT}개 일치, 보너스 볼 일치(${REWORD.toLocaleString(
            "ko-KR"
          )}원) - ${count}개`
        );
      }
      console.log(
        `${MATCH_COUNT}개 일치 (${REWORD.toLocaleString(
          "ko-KR"
        )}원) - ${count}개`
      );
    });
  },
  printTotalProfit: (totalProfit) => {
    console.log(`총 수익률은 ${totalProfit}%입니다.\n`);
  },
};

export default Output;
