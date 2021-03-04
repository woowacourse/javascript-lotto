import { Component } from '../../shared/models/index.js';
import { $, $$ } from '../../shared/utils/DOM.js';

export default class LottoDetail extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.state.subscribe(this.mountTemplate.bind(this));
  }

  initEvent() {
    this.$target.addEventListener('change', this.onChange.bind(this));
  }

  onChange({ target }) {
    if (target.id !== 'lotto-numbers-toggle-button') {
      return;
    }

    const $toggle = $('#lotto-numbers-toggle-button');
    const $container = $('#lotto-container');

    $toggle.checked //
      ? $container.classList.add('flex-col')
      : $container.classList.remove('flex-col');
    $$('[data-lotto-numbers]').forEach($number => {
      $number.style.display = $toggle.checked ? 'block' : 'none';
    });
  }

  mountTemplate() {
    const { tickets } = this.props.state.getState();

    this.$target.innerHTML = `
      <div class="d-flex">
        <label class="flex-auto my-0">총 ${tickets.length}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input type="checkbox" id="lotto-numbers-toggle-button" />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div id="lotto-container" class="d-flex flex-wrap">${lottoDetail(tickets)}</div>
    `;

    function lottoDetail(tickets) {
      return tickets.reduce((html, ticket, idx) => {
        return (html += ` 
          <div class="lotto-wrapper d-flex items-start">
            <span class="lotto mx-1 text-4xl">🎟️ </span>
            <span data-lotto-numbers=${idx} class="mx-1 text-2xl d-none">
              ${ticket.numbers.join(', ')}
            </span>
          </div>
        `);
      }, '');
    }
  }
}
