import MyReact from './core/MyReact';
import store from './core/Store';

function LottoStatisticsModal({ $target, restart }) {
  this.$target = $target;

  MyReact.call(this);

  this.template = () => {
    const { profitRate, isModal } = store.state;

    return isModal
      ? `
    <div class="modal">
      <div class="statistics-container pd_1_rem">
        <h3 class="lotto-subtitle w-100 flex flex--h-center mgTop_3_rem">🏆 당첨 통계 🏆</h3>
        <ul class="statistics-list mgTop_3_rem lotto-body">
          <li class="flex flex--space-between statistics-list__item lotto-caption space-y-3">
            <h4 class="statistics-list__item__one flex flex--center">일치 갯수</h4>
            <h4 class="statistics-list__item__one flex flex--center">당첨금</h4>
            <h4 class="statistics-list__item__one flex flex--center">당첨 갯수</h4>
          </li>
          <li class="flex flex--space-between statistics-list__item space-y-3">
            <h4 class="statistics-list__item__one flex flex--center">3개</h4>
            <h4 class="statistics-list__item__one flex flex--center">5,000원</h4>
            <h4 class="statistics-list__item__one flex flex--center">${store.state.winningRanks[1]}</h4>
          </li>
          <li class="flex flex--space-between statistics-list__item space-y-3">
            <h4 class="statistics-list__item__one flex flex--center">4개</h4>
            <h4 class="statistics-list__item__one flex flex--center">50,000원</h4>
            <h4 class="statistics-list__item__one flex flex--center">${store.state.winningRanks[2]}</h4>
          <li class="flex flex--space-between statistics-list__item space-y-3">
            <h4 class="statistics-list__item__one flex flex--center">5개</h4>
            <h4 class="statistics-list__item__one flex flex--center">1,500,000</h4>
            <h4 class="statistics-list__item__one flex flex--center">${store.state.winningRanks[3]}</h4>
          </li>
          <li class="flex flex--space-between statistics-list__item space-y-3">
            <h4 class="statistics-list__item__one flex flex--center">5개 + 보너스볼</h4>
            <h4 class="statistics-list__item__one flex flex--center">30,000,000</h4>
            <h4 class="statistics-list__item__one flex flex--center">${store.state.winningRanks[4]}</h4>
          </li>
          <li class="flex flex--space-between statistics-list__item space-y-3">
            <h4 class="statistics-list__item__one flex flex--center">6개</h4>
            <h4 class="statistics-list__item__one flex flex--center">2,000,000,000</h4>
            <h4 class="statistics-list__item__one flex flex--center">${store.state.winningRanks[5]}</h4>
          </li>
        </ul>

        <div class="lotto-income mgTop_2_rem text--center">당신의 수익률은 ${profitRate}</div>
        <button class="lotto-restart button w-100 mgTop_2_rem">다시 시작하기</button>

      </div>
    </div>
  `
      : '';
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
  };

  this.setEvent = () => {
    $target.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        store.setState({ isModal: false });
        restart();
      }
    });

    $target.addEventListener('click', (e) => {
      if (!e.target.closest('.statistics-container')) {
        store.setState({ isModal: false });
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && store.state.isModal) {
        store.setState({ isModal: false });
      }
    });
  };

  this.setup();
}

export default LottoStatisticsModal;
