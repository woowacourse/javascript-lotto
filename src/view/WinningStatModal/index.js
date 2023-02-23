import { $ } from '../../utils/dom';

class WinningStatModal {
  #template = /* html */ `
    <div class="dimmed flex-center">
      <div class="modal-content">
        <div class="button-wrapper">
          <button class="modal-close-button">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/></svg>
          </button>
        </div>
        <h3 class="modal-title">🏆 당첨 통계 🏆</h3>
        <table class="stat">
          <thead>
            <tr>
              <th>
                일치 갯수
              </th>
              <th>
                당첨금
              </th>
              <th>
                당첨 갯수
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <strong class="profit-rate">당신의 총 수익률은 %입니다.</strong>
        <button class="restart-button typo-button">다시 시작하기</button>
      </div>
    </div>
  `;

  $target;

  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.insertAdjacentHTML('afterbegin', this.#template);
    $('.modal-close-button').addEventListener('click', () =>
      this.handleModalClose()
    );
    $('.restart-button').addEventListener('click', () =>
      this.handleModalClose()
    );
  }

  handleModalClose() {
    $('.modal').classList.toggle('hidden');
  }
}

export default WinningStatModal;
