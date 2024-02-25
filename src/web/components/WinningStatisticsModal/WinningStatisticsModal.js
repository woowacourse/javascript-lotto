import BaseComponent from '../BaseComponent/BaseComponent.js';
import styles from './WinningStatisticsModal.module.css';

import { RateOfReturnCalculator, WinningRank } from '../../../domain/index.js';

import { COMPONENT_SELECTOR, CUSTOM_EVENT_TYPE } from '../../../constants/webApplication.js';

import { $ } from '../../utils/dom.js';

class WinningStatisticsModal extends BaseComponent {
  #rateOfReturn;

  #winningRankResult;

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
                        <td>${WinningRank.RANK_RULE['5th'].match}개</td>
                        <td>${RateOfReturnCalculator.WINNING_PRIZE_DETAIL[
                          '5th'
                        ].toLocaleString()}</td>
                        <td>
                            <span>${
                              this.#winningRankResult ? this.#winningRankResult['5th'] : 0
                            }</span>개
                        </td>
                        </tr>
                        <tr class="${styles.textCenter}">
                        <td>${WinningRank.RANK_RULE['4th'].match}개</td>
                        <td>${RateOfReturnCalculator.WINNING_PRIZE_DETAIL[
                          '4th'
                        ].toLocaleString()}</td>
                        <td>
                            <span>${
                              this.#winningRankResult ? this.#winningRankResult['4th'] : 0
                            }</span>개
                        </td>
                        </tr>
                        <tr class="${styles.textCenter}">
                        <td>${WinningRank.RANK_RULE['3rd'].match}개</td>
                        <td>${RateOfReturnCalculator.WINNING_PRIZE_DETAIL[
                          '3rd'
                        ].toLocaleString()}</td>
                        <td>
                            <span>${
                              this.#winningRankResult ? this.#winningRankResult['3rd'] : 0
                            }</span>개
                        </td>
                        </tr>
                        <tr class="${styles.textCenter}">
                        <td>${WinningRank.RANK_RULE['2nd'].match}개 + 보너스볼</td>
                        <td>${RateOfReturnCalculator.WINNING_PRIZE_DETAIL[
                          '2nd'
                        ].toLocaleString()}</td>
                        <td>
                            <span>${
                              this.#winningRankResult ? this.#winningRankResult['2nd'] : 0
                            }</span>개
                        </td>
                        </tr>
                        <tr class="${styles.textCenter}">
                        <td>${WinningRank.RANK_RULE['1st'].match}개</td>
                        <td>${RateOfReturnCalculator.WINNING_PRIZE_DETAIL[
                          '1st'
                        ].toLocaleString()}</td>
                        <td>
                            <span>${
                              this.#winningRankResult ? this.#winningRankResult['1st'] : 0
                            }</span>개
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="${styles.rateOfReturnMessage}">
                당신의 총 수익률은 <span>${this.#rateOfReturn ?? 0}</span>% 입니다.
            </p>
            <button id="reset-button" type="reset" class="${
              styles.resetButton
            } caption">다시 시작하기</button>
        </div>
    `;
  }

  setEvent() {
    this.on(
      { target: document, eventName: CUSTOM_EVENT_TYPE.openModal },
      this.#handleOpenModal.bind(this),
    );

    this.on(
      { target: $(this, COMPONENT_SELECTOR.modalCloseButton), eventName: 'click' },
      this.#handleCloseModal.bind(this),
    );

    this.on(
      { target: $(this, COMPONENT_SELECTOR.resetButton), eventName: 'click' },
      this.#handleDispatchResetEvent.bind(this),
    );
  }

  #handleOpenModal(event) {
    const { rateOfReturn, winningRankResult } = event.detail;

    this.#rateOfReturn = rateOfReturn;
    this.#winningRankResult = winningRankResult;

    this.classList.remove('close');

    this.connectedCallback();
  }

  #handleCloseModal() {
    this.classList.add('close');
  }

  #handleDispatchResetEvent() {
    this.emit(CUSTOM_EVENT_TYPE.reset);
  }
}

customElements.define('winning-statistics-modal', WinningStatisticsModal);
