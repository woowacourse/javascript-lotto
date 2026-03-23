import { PRIZE, RANK_MAP } from "../Utils/Constants.js";

const OutputView = {
  printLottoList(lottos) {
    const lottoCount = document.querySelector("#lotto-count");
    const lottoList = document.getElementById("lotto-list");

    lottoCount.textContent = `총 ${lottos.length}개를 구매하였습니다.`;

    lottoList.replaceChildren();

    const fragment = document.createDocumentFragment();

    lottos.forEach((lotto) => {
      const li = document.createElement("li");
      li.className = "lotto-item";

      const emojiSpan = document.createElement("span");
      emojiSpan.className = "emoji";
      emojiSpan.textContent = "🎟️";

      const lottoSpan = document.createElement("span");
      lottoSpan.className = "lotto";
      lottoSpan.textContent = lotto.toString().replace(/^\[|\]$/g, "");

      li.append(emojiSpan, lottoSpan);
      fragment.appendChild(li);
    });

    lottoList.appendChild(fragment);
  },

  printMatchResult(result) {
    const winningRowResult = document.querySelector("#winning-row-result");
    let winnigResultHtml = "";

    result = Object.fromEntries(Object.entries(result).reverse());

    // 등수별 결과 출력
    for (const key in result) {
      const prize = PRIZE[key].toLocaleString();
      const count = result[key];
      winnigResultHtml += `
      <tr>
        <td>${RANK_MAP[key]}</td>
        <td>${prize}</td>
        <td>${count}개</td>
      </tr>`;
    }

    winningRowResult.innerHTML = winnigResultHtml;
  },

  printProfitRate(profitRate) {
    const profitRatePrint = document.querySelector("#profitRate-print");
    profitRatePrint.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  showWinningSection() {
    const winningLottoSection = document.querySelector(".winning-lotto");
    winningLottoSection.classList.add("show");
  },

  showModal() {
    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.classList.add("show");
  },

  hideModal() {
    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.classList.remove("show");
  },

  showAlert(message) {
    window.alert(message);
  },
};

export default OutputView;
