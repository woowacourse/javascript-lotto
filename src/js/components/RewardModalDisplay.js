import { $, $$ } from '../utils/dom.js';
import Component from '../core/Component.js';
import { store } from './App.js';
import { REWARDS } from '../utils/constants.js';
import { restart } from '../redux/action.js';
import Button from './Button/Button.js';

export default class RewardModalDisplay extends Component {
  mainTemplate() {
    let i = 6;
    return `
      <div class="modal-inner p-10">
        <div class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </div>

        <h2 class="text-center">🏆 당첨 통계 🏆</h2>
        <div class="d-flex justify-center">
          <table class="result-table border-collapse border border-black">
            <thead>
              <tr class="text-center">
                <th class="p-3">일치 갯수</th>
                <th class="p-3">당첨금</th>
                <th class="p-3">당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center">
                <td class="p-3">3개</td>
                <td class="p-3">${REWARDS[`rank${--i}`]}</td>
                <td data-td="rank${i}" class="p-3">0개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">4개</td>
                <td class="p-3">${REWARDS[`rank${--i}`]}</td>
                <td data-td="rank${i}" class="p-3">0개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개</td>
                <td class="p-3">${REWARDS[`rank${--i}`]}</td>
                <td data-td="rank${i}" class="p-3">0개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개 + 보너스볼</td>
                <td class="p-3">${REWARDS[`rank${--i}`]}</td>
                <td data-td="rank${i}" class="p-3">0개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">6개</td>
                <td class="p-3">${REWARDS[`rank${--i}`]}</td>
                <td data-td="rank${i}" class="p-3">0개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p data-p="profit" class="text-center font-bold">당신의 총 수익률은 %입니다.</p>
        <div class="d-flex justify-center mt-5">
        ${new Button({
          id: 'restart-btn',
          type: 'reset',
          classes: ['btn', 'btn-cyan'],
          text: '다시 시작하기',
        }).mainTemplate()}
        </div>
      </div>
    `;
  }

  setup() {
    store.subscribe(this.render.bind(this));
  }

  selectDOM() {
    this.$restartButton = $('#restart-btn');
    this.$winningCountTexts = $$('[data-td]');
    this.$profitText = $('[data-p=profit]');
    this.$closeButton = $('.modal-close');
  }

  bindEvent() {
    this.$closeButton.addEventListener('click', this.onModalClose.bind(this));
    this.$target.addEventListener(
      'mousedown',
      this.onClickOutsideModal.bind(this),
    );
    this.$restartButton.addEventListener('click', this.onRestart.bind(this));
  }

  onRestart() {
    store.dispatch(restart());
  }

  onClickOutsideModal(e) {
    if (e.target.closest('.modal-inner')) return;
    this.onModalClose();
  }

  onModalShow() {
    this.$target.classList.add('open');
  }

  onModalClose() {
    this.$target.classList.remove('open');
  }

  render(prevStates, states) {
    //fail case
    if (states === undefined) {
      this.$target.innerHTML = this.mainTemplate();
      return;
    }

    // success case
    if (prevStates.winningCount !== states.winningCount) {
      const getWinningCountText = key =>
        Object.keys(states.winningCount).length === 0
          ? '0개'
          : `${states.winningCount[key]}개`;

      this.$winningCountTexts.forEach($winningCountText => {
        const key = $winningCountText.getAttribute('data-td');
        $winningCountText.textContent = getWinningCountText(key);
      });
    }

    if (prevStates.profit !== states.profit) {
      this.$profitText.textContent = `당신의 총 수익률은 ${states.profit}% 입니다.`;
    }

    states.profit === 0 ? this.onModalClose() : this.onModalShow();
  }
}
