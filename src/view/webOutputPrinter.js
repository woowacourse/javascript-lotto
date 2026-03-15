import { PRIZE } from "../constants/constant.js";

export const webOutputPrinter = {
  printMyLottoLists(randomLottos) {
    const myLotto = document.getElementById("myLotto-section");
    const myLottoCountText = document.getElementById("myLotto-count-text");
    const myLottoList = document.getElementById("myLotto-list");

    myLottoList.textContent = "";

    myLottoCountText.textContent = `총 ${randomLottos.length}개를 구매하였습니다.`;

    for (const lotto of randomLottos) {
      const newLi = document.createElement('li');
      newLi.className = "myLotto-ticket";
      newLi.textContent = `🎟️ ${lotto.getNumber().join(', ')}`;
      myLottoList.appendChild(newLi);
    }

    const winningBonusSection = document.getElementById("winning-bonus-section");
    winningBonusSection.style.display = "block";

    const resultButton = document.getElementById("result-button");
    resultButton.style.display = "block";

    myLotto.style.display = 'block';
  },

  printLottoResult(result) {
    const arrayKey = ["FIFTH", "FOURTH","THIRD", "SECOND", "FIRST"];
    const prizeMoney = document.querySelectorAll(".prizeMoney");
    const winningCount = document.querySelectorAll(".winningCount");

    for (let i = 0; i < prizeMoney.length; i++) {
      prizeMoney[i].textContent = `${PRIZE[arrayKey[i]].toLocaleString()}`;
      winningCount[i].textContent = `${result[arrayKey[i]]}개`;
    }
  },

  printProfit(profit) {
    const profitRatioText = document.getElementById("profit-ratio-text");
    profitRatioText.textContent = `당신의 총 수익률은 ${profit.toFixed(1)}%입니다.`
  }
}
