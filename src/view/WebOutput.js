import Output from "./Output.js";
import { RANK, RANK_CONDITION, RANK_PRIZE } from "../constant/index.js";

class ConsoleOutput extends Output {
  constructor() {
    super();
  }

  printResult(countsObject, returnOnInvestment) {
    const overlayEl = document.querySelector(".overlay");
    const winningNumberAndBonusFormEl = document.querySelector(
      ".winning-number-and-bonus__container",
    );
    const modalHeaderEl = document.querySelector(".modal__header");
    const modalBodyEl = document.querySelector(".modal__body");

    winningNumberAndBonusFormEl.addEventListener("submit", (event) => {
      event.preventDefault();
      overlayEl.classList.remove("hidden");
    });

    if (overlayEl && modalHeaderEl && modalBodyEl) {
      overlayEl.classList.remove("hidden");

      modalHeaderEl.innerHTML = `
        <button class="close__button">X</button>
        <h2>🏆 당첨 통계 🏆</h2>
      `;
      
      modalBodyEl.innerHTML = `
      <table>
            <thead>
              <tr>
                <th>일치 갯수</th>
                <th>당첨금</th>
                <th>당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
              ${Object.values(RANK)
                .toReversed()
                .map(
                  (rank) => `
                  <tr>
                    <td>
                    ${[
                      `${RANK_CONDITION[rank].count}개`,
                      ...(RANK_CONDITION[rank].hasBonus ? ["보너스볼"] : []),
                    ].join("+")}
                    </td>
                    <td>${RANK_PRIZE[rank].toLocaleString("ko-KR")}</td>
                    <td>${countsObject[rank]}개</td>
                  </tr>
                `,
                )
                .join("")}
            </tbody>
          </table>
          <p>당신의 총 수익률은 ${returnOnInvestment.toFixed(1)}%입니다.</p>
      `;
    }
  }

  printPurchasedLottos(lottos) {
    const listEl = document.querySelector(".purchased-lottos__container");

    if (listEl) {
      listEl.innerHTML = `
      <li>${lottos.length}장을 구매했습니다.</li>
      ${lottos
        .map(
          (lotto) => `
        <li>${lotto.getNumbers().join(", ")}</li>
      `,
        )
        .join("")}
    `;
    }
  }
}

export default ConsoleOutput;
