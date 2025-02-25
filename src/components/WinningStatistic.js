import Button from "../common/button.js";
import { LOTTO_STATUS } from "../constants/lotto.js";

export default class WinningStatistic {
  constructor(lottoHistory, rate) {
    this.init(lottoHistory, rate);
  }

  render($target) {
    $target.appendChild(this.$div);
  }

  init(lottoHistory, rate) {
    this.$div = document.createElement("div");
    const $title = document.createElement("p");
    this.$div.className = "winning-static-container";
    $title.innerText = "🏆 당첨 통계 🏆";
    $title.className = "winning-static-title";

    const $table = document.createElement("table");
    $table.innerHTML = `
        <tr class="table-head">
          <th scope="col">일치 갯수</td>
          <th scope="col">당첨금</td>
          <th scope="col">당첨 갯수</td>
        </tr>
        ${Object.entries(lottoHistory)
          .reverse()
          .map(([rank, count]) => {
            const { REWORD, COUNT: MATCH_COUNT } = LOTTO_STATUS.find(
              (status) => status.RANK === Number(rank)
            );
            if (Number(rank) === 2) {
              return `
            <tr class="tabel-row">
              <td>5개+보너스볼</td>
              <td>${REWORD.toLocaleString("ko-KR")}</td>
              <td>${count}개</td>
            </tr>`;
            }
            return `
            <tr class="tabel-row">
              <td>${MATCH_COUNT}개</td>
              <td>${REWORD.toLocaleString("ko-KR")}</td>
              <td>${count}개</td>
            </tr>`;
          })
          .join("")}
    `;

    const $rateText = document.createElement("p");
    $rateText.innerText = `당신의 총 수익률은 ${rate}입니다.`;
    $rateText.className = "rate-text";
    const $footer = document.createElement("div");
    $footer.className = "winning-static-footer";

    this.$div.appendChild($title);
    this.$div.appendChild($table);
    $footer.appendChild($rateText);

    this.$div.appendChild($footer);

    new Button(
      $footer,
      () => {
        const $modalBg = document.querySelector(".modal-bg");
        const $container = document.querySelector(".modal");

        $modalBg.classList.remove("modal-bg-show");
        $container.classList.remove("modal-show");
      },
      "다시 시작하기"
    );
  }
}
