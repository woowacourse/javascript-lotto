// model
import LottoMachine from './domain/LottoMachine';
import WinningNumbers from './domain/WinningNumbers';
import BonusNumber from './domain/BonusNumber';
import CorrectLotto from './domain/CorrectLotto';

// component
import LottoMoneyInput from './components/LottoMoneyInput';
import LottoPurchaseList from './components/LottoPurchaseList';
import LottoCorrectInput from './components/LottoCorrectInput';
import LottoStatistics from './domain/LottoStatistics';
import LottoStatisticsModal from './components/LottoStatisticsModal';

import '../css/reset.css';
import '../css/spacing.css';
import '../css/typograpy.css';
import '../css/styles.css';
import '../css/flexbox.css';

import { getDom } from './utils/dom';

function App($target) {
  this.$root = $target;

  this.lottoMachine = new LottoMachine();
  this.correctLotto = new CorrectLotto();

  this.state = {
    buyLottos: [],
    winningRanks: [],
    profitRate: 0,
    isModal: false,
  };

  this.template = () => `
    <header class="flex flex--v-Center lotto-header">
        <h1 class="lotto-subtitle mgLeft_10_rem">🎱 행운의 로또</h1>
    </header>
    <section class="flex flex--center w-100 mgBottom_5_rem">
      <div class="lotto-card mgTop_5_rem pd_1_rem">
        <h2 class="flex flex--h-center lotto-card__title lotto-subtitle mgTop_3_rem">
            🎱 내 번호 당첨 확인 🎱
        </h2>
        <div class="lotto-money"></div>
        <ul class="lotto-tickets lotto-body mgTop_2_rem"></ul>
        <div class="correct-lotto--input"></div>
        <div class="lotto-statistics-modal"></div>
      </div>
    </section>
    <footer class="flex flex--center lotto-caption">
      <p>Copyright 2023. woowacourse</p>
    </footer>
  `;

  this.mounted = () => {
    new LottoMoneyInput({
      $target: getDom('.lotto-money'),
      inputMoneyEvent: this.inputLottoMoneyEvent,
    });

    new LottoPurchaseList({
      $target: getDom('.lotto-tickets'),
      lottos: this.state.buyLottos,
    });

    new LottoCorrectInput({
      $target: getDom('.correct-lotto--input'),
      lottos: this.state.buyLottos,
      inputCorrectLottoEvent: this.inputCorrectLottoEvent,
    });

    new LottoStatisticsModal({
      $target: getDom('.lotto-statistics-modal'),
      winningRanks: this.state.winningRanks,
      profitRate: this.state.profitRate,
      isModal: this.state.isModal,
      restart: this.restart,
    });
  };

  this.render = () => {
    this.$root.innerHTML = this.template();
    this.mounted();
  };

  this.setState = (newData) => {
    this.state = { ...this.state, ...newData };
    this.render();
  };

  this.inputLottoMoneyEvent = (money) => {
    try {
      this.lottoMachine.purchase(money);
      this.setState({ buyLottos: this.lottoMachine.lottos });
    } catch (error) {
      alert(error.message);
    }
  };

  this.inputCorrectLottoEvent = (winningNumbers, bonusNumber) => {
    try {
      this.correctLotto.setWinningNumbers(new WinningNumbers(winningNumbers));
      this.correctLotto.setBonusNumber(new BonusNumber(bonusNumber));
      this.correctLotto.validateLottos();

      this.getLottoStatisticsEvent();
    } catch (error) {
      alert(error.message);
    }
  };

  this.getLottoStatisticsEvent = () => {
    const { lottos, price } = this.lottoMachine;
    const statics = new LottoStatistics(this.correctLotto);

    const winningRanks = statics.getAllLottosRank(lottos);
    const profitRate = statics.getProfitRate(winningRanks, price);

    this.setState({
      winningRanks: winningRanks.reverse(),
      profitRate,
      isModal: true,
    });
  };

  this.restart = () => {
    this.setState({
      buyLottos: [],
      winningRanks: [],
      profitRate: 0,
      isModal: false,
    });
  };

  // 실행
  this.render();
}

export default App;
