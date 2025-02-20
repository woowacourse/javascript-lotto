import commaizeNumber from "../utils/commaizeNumber.js";

export const printLottoCount = (count) => {
  console.log(`${count}개를 구매했습니다.`);
};

export const printLottoNumbers = (numbers) => {
  console.log(numbers);
};

export const printResult = (result) => {
  console.log("당첨 통계\n--------------------");
  result.reverse().map(({ rank, winningCriteria, reward, count }) => {
    const bonusText = rank === "SECOND" ? ", 보너스 볼 일치" : "";
    console.log(
      `${winningCriteria}개 일치${bonusText} (${commaizeNumber(
        reward
      )}원) - ${count}개`
    );
  });
};

export const printProfitRate = (price, reward) => {
  const rate = (reward / price) * 100;
  console.log(`총 수익률은 ${commaizeNumber(rate.toFixed(2))}%입니다.`);
};
