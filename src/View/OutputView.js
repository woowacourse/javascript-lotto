import { PRIZE, RANK_MAP } from "../Utils/Constants.js";

const OutputView = {
  printLottoList(lottos) {
    const lottoCount = document.querySelector("#lotto-count");

    lottoCount.textContent = `총 ${lottos.length}개를 구매하였습니다.`;

    let lottosHtml = "";

    const lottoList = document.getElementById("lotto-list");

    lottos.forEach((lotto) => {
      lottosHtml += `
      <li class="lotto-item">
          <span class="emoji">🎟️</span>
          <span class = "lotto">${lotto.toString().replace(/^\[|\]$/g, "")}</span>
        </li>`;
    });

    lottoList.innerHTML = lottosHtml;
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
    const lottoCount = document.querySelector("#profitRate-print");

    lottoCount.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  },
};

export default OutputView;
