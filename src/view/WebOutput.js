import Output from "./Output.js";
import { RANK, RANK_CONDITION, RANK_PRIZE } from "../constant/index.js";
import lottoImg from "./../../public/lotto.png";
import closeImg from "./../../public/close.svg";
import WebUtil from "../util/WebUtil.js";

class WebOutput extends Output {
  #webUtil;
  #elements;

  constructor() {
    super();

    this.#webUtil = new WebUtil();
    this.#elements = {
      mainContainerBody: document.querySelector(".main__container__body"),
      mainContainerFooter: document.querySelector(".main__container__footer"),
      dialog: document.querySelector("dialog"),
      dialogHeader: document.querySelector(".dialog__header"),
      dialogBody: document.querySelector(".dialog__body"),
    };

    if (!this.#elements.mainContainerBody) {
      throw new Error("main__container__body를 찾을 수 없습니다.");
    }

    if (!this.#elements.mainContainerFooter) {
      throw new Error("main__container__footer를 찾을 수 없습니다.");
    }

    if (!this.#elements.dialog) {
      throw new Error("dialog를 찾을 수 없습니다.");
    }

    if (!this.#elements.dialogHeader) {
      throw new Error("dialog__header를 찾을 수 없습니다.");
    }

    if (!this.#elements.dialogBody) {
      throw new Error("dialog__body를 찾을 수 없습니다.");
    }
  }

  printError(message) {
    alert(message);
  }

  printResult(countsObject, returnOnInvestment) {
    const resultData = this.#getResultData(countsObject);
    this.#renderResultDialog(resultData, returnOnInvestment);
    this.#setupResultDialogEvent();
  }

  printPurchasedLottos(lottos) {
    this.#renderPurchasedLottos(lottos);
  }

  #getResultData(countsObject) {
    return Object.values(RANK)
      .toReversed()
      .map((rank) => [
        [
          `${RANK_CONDITION[rank].count}개`,
          ...(RANK_CONDITION[rank].hasBonus ? ["보너스볼"] : []),
        ].join("+"),
        RANK_PRIZE[rank],
        `${countsObject[rank]}개`,
      ]);
  }

  #renderResultDialog(resultData, returnOnInvestment) {
    this.#webUtil.renderElement({
      parentElement: this.#elements.dialogHeader,
      tagName: "form",
      method: "dialog",
      className: "close__form",
      html: `
        <h2>🏆 당첨 통계 🏆</h2>
        <button class="close__button">
          <img src="${closeImg}" alt="닫기" />
        </button>
      `,
    });

    this.#webUtil.renderElement({
      parentElement: this.#elements.dialogBody,
      tagName: "table",
      className: "result__table",
      html: `
        <thead>
          <tr>
            <th>일치 갯수</th>
            <th>당첨금</th>
            <th>당첨 갯수</th>
          </tr>
        </thead>
        <tbody>
          ${resultData
            .map(
              ([condition, prize, count]) => `
            <tr>
              <td>${condition}</td>
              <td>${prize.toLocaleString("ko-KR")}</td>
              <td>${count}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
    `,
    });

    this.#webUtil.renderElement({
      parentElement: this.#elements.dialogBody,
      tagName: "p",
      className: "return-on-investment",
      html: `당신의 총 수익률은 ${returnOnInvestment.toFixed(1)}%입니다.`,
    });

    this.#openDialog();

    return this.#elements.dialog;
  }

  #setupResultDialogEvent() {
    if (!document.querySelector(".show-result__form")) return;

    this.#webUtil.handleEventAsync({
      element: document.querySelector(".show-result__form"),
      eventName: "submit",
      eventHandler: (e) => {
        e.preventDefault();
        this.#openDialog();
      },
    });
  }

  #renderPurchasedLottos(lottos) {
    const containerEl = this.#webUtil.renderElement({
      parentElement: this.#elements.mainContainerBody,
      tagName: "div",
      className: "purchased-lottos__container",
    });

    this.#webUtil.renderElement({
      parentElement: containerEl,
      tagName: "p",
      className: "purchased-lottos-count",
      html: `총 ${lottos.length}개를 구매하였습니다.`,
    });

    this.#webUtil.renderElement({
      parentElement: containerEl,
      tagName: "ul",
      className: "purchased-lottos__list",
      html: `
        ${lottos.map((lotto) => `
          <li class="purchased-lotto">
            <img src="${lottoImg}" alt="로또" />
            <span>${lotto.getNumbers().join(", ")}</span>
          </li>
        `).join("")}
      `,
    });

    return containerEl;
  }

  #openDialog() {
    this.#elements.dialog.showModal();
  }
}

export default WebOutput;
