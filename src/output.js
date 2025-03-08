import { RANK_INFO_TABLE } from "./constant/rank.js";

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
    const resultContainer = document.querySelector(".modal-container");
    const modalTable = resultContainer.querySelector(".modal-table");

    modalTable.innerHTML = "";

    modalTable
      .appendChild(document.createElement("div"))
      .classList.add("modal-table-divider");

    const tableHeaderRow = document.createElement("div");
    tableHeaderRow.classList.add("modal-table-row");
    tableHeaderRow.innerHTML = `
      <p class="modal-table-cell">일치 갯수</p>
      <p class="modal-table-cell">당첨금</p>
      <p class="modal-table-cell">당첨 갯수</p>
    `;
    modalTable.appendChild(tableHeaderRow);

    modalTable
      .appendChild(document.createElement("div"))
      .classList.add("modal-table-divider");

    for (let rank = 1; rank <= 5; rank++) {
      const rankInfo = RANK_INFO_TABLE[rank];

      if (rankInfo) {
        const rankLottos = prize[rank - 1] || { lottos: [] };

        const rankRow = document.createElement("div");
        rankRow.classList.add("modal-table-row");
        rankRow.innerHTML = `
          <p class="modal-table-cell">${rankInfo.message}</p>
          <p class="modal-table-cell">${rankInfo.price.toLocaleString()}</p>
          <p class="modal-table-cell">${rankLottos.lottos.length}개</p>
        `;
        modalTable.appendChild(rankRow);

        modalTable
          .appendChild(document.createElement("div"))
          .classList.add("modal-table-divider");
      }
    }

    const profitMessage = document.createElement("p");
    profitMessage.classList.add("profit-text");
    profitMessage.innerText = `당신의 총 수익률은 ${profit}%입니다.`;
    resultContainer.appendChild(profitMessage);

    const restartButton = document.createElement("button");
    restartButton.classList.add("restart-button");
    restartButton.innerText = "다시 시작하기";
    resultContainer.appendChild(restartButton);

    restartButton.addEventListener("click", () => {
      document.querySelector(".modal").style.display = "none";
      document.querySelector(".lotto-list-container").style.display = "none";
      document.querySelector(".number-input-form").style.display = "none";
      document.querySelector(".result-button-container").style.display = "none";
      location.reload();
    });
  },
};

export default outputView;
