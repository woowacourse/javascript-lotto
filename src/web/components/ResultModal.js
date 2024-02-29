import styles from './css/ResultModal.module.css';

class ResultModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<section class =${styles.modal_background}>
    <custom-box id="modal" size="medium">
      <button id="modal-close-button" class=${styles.modal__close_button}>X</button>
      <h1 class="lotto-title">🏆 당첨 통계 🏆</h1>
      <table id="reward-table" class="${styles.result__table} lotto-subtitle">
        <tr>
            <td class=${styles.result__table_tr}>일치 갯수</td>
            <td class=${styles.result__table_tr}>당첨금</td>
            <td class=${styles.result__table_tr}>당첨 갯수</td>
        </tr>
        <tr>
            <td class=${styles.result__table_tr}>1</td>
            <td class=${styles.result__table_tr}>2</td>
            <td class=${styles.result__table_tr}>3</td>
        </tr>
        <tr>
            <td class=${styles.result__table_tr}>ㅋㅋ</td>
            <td class=${styles.result__table_tr}>ㅋㅋ</td>
            <td class=${styles.result__table_tr}>ㅋㅋ</td>
        </tr>
      </table>
      <h4 id="profit-text" class="lotto-subtitle">당신의 총 수익률은 어떤값%입니다.</h4>
      <custom-button id="retry-button" width="stretch">다시 시작하기</custom-button>
    </custom-box>
  </section>;`;
  }
}

customElements.define('result-modal', ResultModal);
