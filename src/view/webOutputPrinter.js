export const webOutputPrinter = {
  printMyLottoLists(lottoNumberArray) {
    const myLotto = document.getElementById("myLotto-section");
    const myLottoCountText = document.getElementById("myLotto-count-text");
    const myLottoList = document.getElementById("myLotto-list");

    myLottoList.textContent = "";

    myLottoCountText.textContent = `총 ${lottoNumberArray.length}개를 구매하였습니다.`;

    for (const lotto of lottoNumberArray) {
      const newLi = document.createElement("li");
      newLi.className = "myLotto-ticket";
      newLi.textContent = `🎟️ ${lotto.join(", ")}`;
      myLottoList.appendChild(newLi);
    }

    const winningBonusSection = document.getElementById(
      "winning-bonus-section",
    );
    winningBonusSection.style.display = "block";

    const resultButton = document.getElementById("result-button");
    resultButton.style.display = "block";

    myLotto.style.display = "block";
  },

  printLottoResult(result) {
    const prizeMoney = document.querySelectorAll(".prizeMoney");
    const winningCount = document.querySelectorAll(".winningCount");
    const resultModal = document.getElementById("result-modal");

    resultModal.showModal();

    for (let i = 0; i < prizeMoney.length; i++) {
      prizeMoney[i].textContent = `${result[i].prize}`;
      winningCount[i].textContent = `${result[i].count}개`;
    }
  },

  printProfit(profit) {
    const profitRatioText = document.getElementById("profit-ratio-text");
    profitRatioText.textContent = `당신의 총 수익률은 ${profit.toFixed(1)}%입니다.`;
  },

  clearLottoScreen() {
    const myLotto = document.getElementById("myLotto-section");
    const winningBonusSection = document.getElementById(
      "winning-bonus-section",
    );
    const resultButton = document.getElementById("result-button");
    const resultModal = document.getElementById("result-modal");

    resultModal.close();
    myLotto.style.display = "none";
    winningBonusSection.style.display = "none";
    resultButton.style.display = "none";

    document.querySelectorAll("input[type=number]").forEach((item) => {
      item.value = "";
    });

    document.querySelectorAll(".myLotto-ticket").forEach((element) => {
      element.remove();
    });
  },
};
