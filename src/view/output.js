import { PRIZE } from "../constants/prize.js";
import commaizeNumber from "../utils/commaizeNumber.js";

export const printLottoCount = (count) => {
  console.log(`${count}개를 구매했습니다.`);
};

export const printLottoNumbers = (numbers) => {
  console.log(numbers);
};

export const printResult = (resultCount) => {
  const prizes = Object.values(PRIZE);
  for (let i = resultCount.length - 1; i >= 1; i--) {
    console.log(
      `${prizes[i - 1].WINNING_COUNT}개 일치${
        i === 2 ? ", 보너스 볼 일치" : ""
      } (${commaizeNumber(prizes[i - 1].REWARD)})원 - ${resultCount[i]}개`
    );
  }
};

export const printProfitRate = (price, reward) => {
  const rate = (reward / price) * 100;
  console.log(`총 수익률은 ${commaizeNumber(rate.toFixed(2))}%입니다.`);
};
