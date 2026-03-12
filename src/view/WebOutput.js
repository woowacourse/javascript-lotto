import Output from "./Output.js";
import { RANK, RANK_CONDITION, RANK_PRIZE } from "../constant/index.js";

class ConsoleOutput extends Output {
  #elements;

  constructor() {
    super();

    this.#elements = {
      mainContainer: document.querySelector(".main__container"),
      overlay: document.querySelector(".overlay"),
      modalHeader: document.querySelector(".modal__header"),
      modalBody: document.querySelector(".modal__body"),
    };

    if (!this.#elements.mainContainer) {
      throw new Error("main__container를 찾을 수 없습니다.");
    }

    if (!this.#elements.overlay) {
      throw new Error("overlay를 찾을 수 없습니다.");
    }

    if (!this.#elements.modalHeader) {
      throw new Error("modal__header를 찾을 수 없습니다.");
    }

    if (!this.#elements.modalBody) {
      throw new Error("modal__body를 찾을 수 없습니다.");
    }
  }

  printResult(countsObject, returnOnInvestment) {
    this.#elements.modalHeader.innerHTML = `
      <button class="close__button">
        <img src="/close.svg" alt="닫기" />
      </button>
      <h2>🏆 당첨 통계 🏆</h2>
    `;

    const closeButtonEl = document.querySelector(".close__button");

    closeButtonEl?.addEventListener("click", () => {
      this.#elements.overlay.classList.add("hidden");
    });

    this.#elements.modalBody.innerHTML = `
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

    this.#elements.overlay.classList.remove("hidden");

    const winningNumberAndBonusFormEl = document.querySelector(
      ".winning-number-and-bonus__container",
    );

    winningNumberAndBonusFormEl?.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#elements.overlay.classList.remove("hidden");
    });
  }

  printPurchasedLottos(lottos) {
    const listEl = document.createElement("ul");
    listEl.className = "purchased-lottos__container";
    this.#elements.mainContainer.appendChild(listEl);

    listEl.innerHTML = `
      <li>총 ${lottos.length}개를 구매했습니다.</li>
      ${lottos
        .map(
          (lotto) => `
        <li class="purchased-lotto">
          <img src='./public/lotto.png' alt='로또' />
          <span>${lotto.getNumbers().join(", ")}</span>
        </li>
      `,
        )
        .join("")}
    `;
  }
}

export default ConsoleOutput;
