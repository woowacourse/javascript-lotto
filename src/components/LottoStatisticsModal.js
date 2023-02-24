function LottoStatisticsModal({
  $target,
  winningRanks,
  profitRate,
  isModal,
  restart,
}) {
  this.$target = $target;

  this.state = {
    money: [5000, 50000, 1500000, 30000000, 2000000000],
    modal: isModal,
  };

  this.makeWinningRankHtml = (
    count,
    money,
    winningRank
  ) => `<li class="flex flex--space-between statistics-list__item">
      <p class="statistics-list__item__one flex flex--center">${count}개</p>
      <p class="statistics-list__item__one flex flex--center">${money}</p>
      <p class="statistics-list__item__one flex flex--center">${winningRank}</p>
    </li>`;

  this.makeWinningAllRankHtml = () => {
    const result = winningRanks
      .slice(1)
      .map((winningRank, idx) =>
        this.makeWinningRankHtml(idx + 3, this.state.money[idx], winningRank)
      )
      .join('');

    return result;
  };

  this.template = () => {
    const { modal } = this.state;

    return modal
      ? `
    <div class="modal">
      <div class="statistics-container pd_1_rem">
        <h3 class="lotto-subtitle w-100 flex flex--h-center mgTop_3_rem">🏆 당첨 통계 🏆</h3>
        <ul class="statistics-list mgTop_3_rem lotto-body">
          <li class="flex flex--space-between statistics-list__item lotto-caption">
            <h4 class="statistics-list__item__one flex flex--center">일치 갯수</h4>
            <h4 class="statistics-list__item__one flex flex--center">당첨금</h4>
            <h4 class="statistics-list__item__one flex flex--center">당첨 갯수</h4>
          </li>
          ${this.makeWinningAllRankHtml()}
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

  this.setState = (newData) => {
    this.state = { ...this.state, ...newData };
    this.render();
  };

  this.setEvent = () => {
    $target.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        this.setState({ modal: false });
        restart();
      }
    });

    $target.addEventListener('click', (e) => {
      if (!e.target.closest('.statistics-container')) {
        this.setState({ modal: false });
      }
    });

    window.addEventListener('keydown', (e) => {
      const { modal } = this.state;

      if (e.key === 'Escape' && modal) {
        this.setState({ modal: false });
      }
    });
  };

  this.render();
  this.setEvent();
}

export default LottoStatisticsModal;
