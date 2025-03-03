const outputView = {
  printLottoCount(lottoCount) {
    const lottoCountContainer = document.querySelector(
      ".lotto-list-container p"
    );
    lottoCountContainer.innerText = `총 ${lottoCount}개를 구매하였습니다.`;
  },

  printLotto(lottos) {
    const lottoListContainer = document.querySelector(".lotto-list");
    lottoListContainer.innerHTML = "";

    lottos.forEach((lotto) => {
      const lottoElement = document.createElement("div");
      lottoElement.classList.add("lotto");

      const lottoIcon = document.createElement("div");
      lottoIcon.classList.add("lotto-icon");
      lottoIcon.innerText = "🎟️";

      const lottoNumbers = document.createElement("p");
      lottoNumbers.classList.add("body-text");
      lottoNumbers.innerText = lotto.numbers.join(", ");

      lottoElement.appendChild(lottoIcon);
      lottoElement.appendChild(lottoNumbers);

      lottoListContainer.appendChild(lottoElement);
    });
  },

  printResult(prize, profit) {
    const resultContainer = document.querySelector(".result-container");
    resultContainer.innerHTML = "";

    prize.forEach((rankLottos, index) => {
      const rank = index + 1;
      const info = RANK_INFO_TABLE[rank];
      const resultItem = document.createElement("div");
      resultItem.classList.add("result-item");

      const rankMessage = document.createElement("p");
      rankMessage.innerText = `${
        info.message
      } (${info.price.toLocaleString()}원) - ${rankLottos.lottos.length}개`;
      resultItem.appendChild(rankMessage);

      resultContainer.appendChild(resultItem);
    });

    const profitMessage = document.createElement("p");
    profitMessage.innerText = `총 수익률은 ${profit}%입니다.`;
    resultContainer.appendChild(profitMessage);
  },
};

export default outputView;
