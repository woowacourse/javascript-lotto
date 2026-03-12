import { PRIZE } from "../constants/constant.js";

export const webOutputPrinter = {
  printMyLottoLists(randomLottos) {
    const myLotto = document.getElementById("myLotto");
    const myLottoP = document.getElementById("myLottoP");
    const myLottoLists = document.getElementById("myLottoLists");

    myLottoP.innerHTML = `총 ${randomLottos.length}개를 구매하였습니다.`;

    for (const lotto of randomLottos) {
      const newLi = document.createElement('li');
      newLi.className = "myLottoListLi";
      newLi.textContent = `🎟️ ${lotto.getNumber().join(', ')}`;
      myLottoLists.appendChild(newLi);
    }

    const winningDiv = document.getElementById("winningDiv");
    winningDiv.style.display = "block";

    const getResultButton = document.getElementById("getResultButton");
    getResultButton.style.display = "block";

    myLotto.style.display = 'block';
  },

  printLottoResult(result) {
    const arrayKey = ["FIFTH", "FOURTH","THIRD", "SECOND", "FIRST"];
    const prizeMoney = document.querySelectorAll(".prizeMoney");
    const winningCount = document.querySelectorAll(".winningCount");

    for (let i = 0; i < prizeMoney.length; i++) {
      prizeMoney[i].innerText = `${PRIZE[arrayKey[i]].toLocaleString()}`;
      winningCount[i].innerText = `${result[arrayKey[i]]}개`;
    }

    const resultModal = document.getElementById("resultModal");
    resultModal.style.display = "block";
  },

  printProfit(profit) {
    const profitP = document.getElementById("profitP");
    profitP.innerText = `당신의 총 수익률은 ${profit.toFixed(1)}%입니다.`
  }
}
