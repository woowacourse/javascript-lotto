import Button from "../common/button.js";

export default class WinningStatistic {
  constructor() {
    this.init();
  }

  render($target) {
    $target.appendChild(this.$div);
  }

  init() {
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
        <tr class="tabel-row">
          <td>3개</td>
          <td>5,000</td>
          <td>n개</td>
        </tr>
        <tr class="tabel-row">
          <td>1개</td>
          <td>10,000</td>
          <td>n개</td>
        </tr>
    `;

    const $rateText = document.createElement("p");
    $rateText.innerText = `당신의 총 수익률은 ${20.0}입니다.`;
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
        // setState초기화
      },
      "다시 시작하기"
    );
  }
}
