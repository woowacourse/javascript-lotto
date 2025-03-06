import {
  CUSTOM_ELEMENTS,
  EVENT_TYPES,
  MATCH_KEY,
  MATCH_PRIZE,
} from "../../constants/constants.js";
import createWinningStatisticsMap from "../../utils/createWinningStatisticsMap.js";
import { eventOff, eventOn } from "../../utils/domUtils.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import "./lotto-result.css";

class LottoResult extends BaseWebComponent {
  constructor() {
    super();
    this.statistics = createWinningStatisticsMap();
    this.profitRatio = 0;
    this.closeButtonHandler = this.#closeDialog.bind(this);
    this.restartButtonHandler = this.#restartGame.bind(this);
  }

  getTemplate() {
    const rows = Object.values(MATCH_KEY)
      .map((key) => {
        const matchText =
          key === MATCH_KEY.FIVE_AND_BONUS
            ? `${MATCH_KEY.FIVE}개+보너스볼`
            : `${key}개`;

        return `
      <tr class="lotto-result__row">
        <td>${matchText}</td>
        <td>${MATCH_PRIZE[key].toLocaleString()}</td>
        <td>${this.statistics.get(key).count}개</td>
      </tr>
      `;
      })
      .join("");

    return `
      <dialog>
        <form class="lotto-result" method="dialog">
          <button class="lotto-result__close-button">
            <img src="close-button.svg" alt="close-button" />
          </button>
          <h2 class="lotto-result__title">🏆 당첨 통계 🏆</h2>
          <table class="lotto-result__statistics">
            <tr>
              <th>일치 갯수</th>
              <th>당첨금</th>
              <th>당첨 갯수</th>
            </tr>
            ${rows}
          </table>
          <p class="lotto-result__profit">당신의 총 수익률은 ${this.profitRatio}%입니다.</p>
          <button class="lotto-result__restart-button">다시 시작하기</button>
        </form>
      </dialog>
      `;
  }

  showResult(statistics, profitRatio) {
    this.statistics = statistics;
    this.profitRatio = profitRatio;
    this.render();
    const dialog = this.querySelector("dialog");
    dialog.showModal();
    this.setEvent();
  }

  setEvent() {
    this.#manageEventListeners(eventOn);
  }

  removeEvent() {
    this.#manageEventListeners(eventOff);
  }

  #manageEventListeners(eventMethod) {
    const closeButton = this.querySelector(".lotto-result__close-button");
    const restartButton = this.querySelector(".lotto-result__restart-button");

    if (closeButton) {
      eventMethod(
        { target: closeButton, eventType: EVENT_TYPES.click },
        this.closeButtonHandler,
      );
    }

    if (restartButton) {
      eventMethod(
        { target: restartButton, eventType: EVENT_TYPES.click },
        this.restartButtonHandler,
      );
    }
  }

  #closeDialog() {
    const dialog = this.querySelector("dialog");
    dialog.close();
    this.removeEvent();
  }

  #restartGame() {
    this.emit(EVENT_TYPES.restart);
    this.removeEvent();
  }
}

customElements.define(CUSTOM_ELEMENTS.lottoResult, LottoResult);
