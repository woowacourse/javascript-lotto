import { $, $$ } from '../utils/dom.js';
import { store } from './App.js';
import { REWARDS } from '../utils/constants.js';
import { restart } from '../redux/action.js';
import Component from '../core/Component.js';
import Button from './Button/Button.js';
import Svg from './Svg/Svg.js';

export default class RewardModalDisplay extends Component {
  winningCountTemplate(matchedCount, reward, rank) {
    return `
    <tr class="text-center">
      <td class="p-3">${matchedCount}</td>
      <td class="p-3">${reward}</td>
      <td data-td="${rank}" class="p-3">0개</td>
    </tr>
    `;
  }

  mainTemplate() {
    const matchedCountText = ['3개', '4개', '5개', '5개 + 보너스볼', '6개'];
    const rewards = Array.from(
      { length: 5 },
      (_, i) => REWARDS[`rank${5 - i}`],
    );

    return `
      <div class="modal-inner p-10">
        <div class="modal-close">
          ${new Svg('+').mainTemplate()}
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
            ${Array.from({ length: 5 }, (_, i) => {
              return this.winningCountTemplate(
                matchedCountText[i],
                rewards[i],
                `rank${5 - i}`,
              );
            }).join('')}
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
    if (states === undefined) {
      this.$target.innerHTML = this.mainTemplate();
      return;
    }

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
