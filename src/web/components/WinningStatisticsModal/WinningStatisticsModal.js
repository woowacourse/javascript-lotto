import BaseComponent from '../BaseComponent/BaseComponent.js';
import styles from './WinningStatisticsModal.module.css';

class WinningStatisticsModal extends BaseComponent {
  #rateOfReturn;

  #winningRankResult;

  setEvent() {
    this.on({ target: document, eventName: 'openModal' }, (event) => {
      const { rateOfReturn, winningRankResult } = event.detail;

      this.#rateOfReturn = rateOfReturn;
      this.#winningRankResult = winningRankResult;

      this.classList.remove('close');

      this.render();

      const modalCloseButton = this.querySelector('#modal-close-button');
      this.on({ target: modalCloseButton, eventName: 'click' }, () => this.classList.add('close'));

      this.on({ target: this.querySelector('#reset-button'), eventName: 'click' }, () =>
        this.emit('reset'),
      );
    });
  }

  render() {
    this.innerHTML = `
        <div class="${styles.modalInner}">
            <button id="modal-close-button" type="button" class="${styles.modalCloseButton}">
                <svg viewBox="0 0 40 40">
                    <path class="${
                      styles.modalCloseIcon
                    }" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
                </svg>
            </button>
            <h2 class="${styles.textCenter} ${styles.title} subtitle">🏆 당첨 통계 🏆</h2>
            <div class="${styles.tableContainer}">
                <table class="${styles.resultTable}">
                    <thead>
                        <tr class="${styles.textCenter}">
                        <th>일치 갯수</th>
                        <th>당첨금</th>
                        <th>당첨 갯수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="${styles.textCenter}">
                        <td>3개</td>
                        <td>5,000</td>
                        <td>
                            <span class="match-count">${
                              this.#winningRankResult ? this.#winningRankResult['5th'] : 0
                            }</span>개
                        </td>
                        </tr>
                        <tr class="${styles.textCenter}">
                        <td>4개</td>
                        <td>50,000</td>
                        <td>
                            <span class="match-count">${
                              this.#winningRankResult ? this.#winningRankResult['4th'] : 0
                            }</span>개
                        </td>
                        </tr>
                        <tr class="${styles.textCenter}">
                        <td>5개</td>
                        <td>1,500,000</td>
                        <td>
                            <span class="match-count">${
                              this.#winningRankResult ? this.#winningRankResult['3rd'] : 0
                            }</span>개
                        </td>
                        </tr>
                        <tr class="${styles.textCenter}">
                        <td>5개 + 보너스볼</td>
                        <td>30,000,000</td>
                        <td>
                            <span class="match-count">${
                              this.#winningRankResult ? this.#winningRankResult['2nd'] : 0
                            }</span>개
                        </td>
                        </tr>
                        <tr class="${styles.textCenter}">
                        <td>6개</td>
                        <td>2,000,000,000</td>
                        <td>
                            <span class="match-count">${
                              this.#winningRankResult ? this.#winningRankResult['1st'] : 0
                            }</span>개
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="${styles.rateOfReturnMessage}">
                당신의 총 수익률은 <span id="profit">${this.#rateOfReturn ?? 0}</span>% 입니다.
            </p>
            <button id="reset-button" type="reset" class="${
              styles.resetButton
            } caption">다시 시작하기</button>
        </div>
    `;
  }
}

customElements.define('winning-statistics-modal', WinningStatisticsModal);
