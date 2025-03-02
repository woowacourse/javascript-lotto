import { LOTTO_RANK } from "../lib/constants";
import { qs } from "../../utils/domHelper";
import Button from "./@common/Button";
import Component from "../core/Component";

export default class StatisticsModal extends Component {
  setEvent() {
    this.addEvent("submit", ".statistics-dialog-close-form", (event) => {
      event.preventDefault();
      this.props.closeModal();
    });
  }

  template() {
    return `
    <dialog class='statistics-dialog'>
        <div class='statistics-dialog-contents'>
          <form class='statistics-dialog-close-form'>
            <button class='dialog-close-btn'>X</button>
          </form>
          <h2 class='statistics-title lotto-subtitle'>🏆 당첨 통계 🏆</h2>
          <div class='statistics-table'>
            <div class='statistics-label body'>
              <span class='awards-label'>일치 갯수</span>
              <span class='prize-label'>당첨금</span>
              <span class='count-label'>당첨 갯수</span>
            </div>
            <ul>
            ${this.getStatisticsTemplate()}
            </ul>
          </div>
          <div class='earning-rate'>당신의 총 수익률은 ${
            this.props.lottoResults?.earningRate
          }%입니다.
          </div>
          <form class='statistics-dialog-retry-form'>
            <button class='retry-btn'>다시 시작하기</button>
          </form>
        </div>
      </dialog>  
    `;
  }

  mounted() {
    new Button(qs(".statistics-dialog-retry-form"), {
      text: "다시 시작하기",
      size: "small",
      className: "retry-btn",
      type: "submit",
      onClick: this.handleButtonClick.bind(this),
    });
  }

  handleButtonClick() {
    this.props.reset();
  }

  getStatisticsTemplate() {
    const { ranks } = this.props.lottoResults || { ranks: [] };

    return Object.entries(LOTTO_RANK)
      .map(([rank, { winNumber, isBonusNumberRequired, prize }]) => {
        const matchDescription = isBonusNumberRequired
          ? `${winNumber}개 + 보너스볼`
          : `${winNumber}개`;

        const count = ranks ? ranks.filter((r) => r === rank).length : 0;

        return `
          <li class='statistics'>
            <span class='awards'>${matchDescription}</span>
            <span class='prize'>${prize.toLocaleString()}원</span>
            <span class='count'>${count}개</span>
          </li>`;
      })
      .join("");
  }
}
