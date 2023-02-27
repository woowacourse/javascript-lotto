// model
import LottoMachine from './domain/LottoMachine';
import WinningNumbers from './domain/WinningNumbers';
import BonusNumber from './domain/BonusNumber';
import CorrectLotto from './domain/CorrectLotto';
import LottoStatistics from './domain/LottoStatistics';

// component
import LottoMoneyInput from './components/LottoMoneyInput';
import LottoPurchaseList from './components/LottoPurchaseList';
import LottoCorrectInput from './components/LottoCorrectInput';
import LottoStatisticsModal from './components/LottoStatisticsModal';

// store
import store from './components/core/Store';

// core
import MyReact from './components/core/MyReact';

// css
import '../css/reset.css';
import '../css/spacing.css';
import '../css/typograpy.css';
import '../css/styles.css';
import '../css/flexbox.css';

// utils
import { getDom } from './utils/dom';

function App($target) {
  this.$root = $target;

  this.lottoMachine = new LottoMachine();
  this.correctLotto = new CorrectLotto();

  MyReact.call(this);

  this.template = () => `
    <header class="flex flex--v-Center lotto-header w-100">
        <h1 class="lotto-subtitle mgLeft_10_rem">🎱 행운의 로또</h1>
    </header>
    <section class="flex flex--center w-100 mgBottom_5_rem">
      <div class="lotto-card mgTop_5_rem pd_1_rem">
        <h2 class="flex flex--h-center lotto-card__title lotto-subtitle mgTop_3_rem w-100">
            🎱 내 번호 당첨 확인 🎱
        </h2>
        <div class="lotto-money"></div>
        <ul class="lotto-tickets lotto-body mgTop_2_rem"></ul>
        <div class="correct-lotto--input"></div>
        <div class="lotto-statistics-modal"></div>
      </div>
    </section>
    <footer class="flex flex--center lotto-caption w-100">
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
    });

    new LottoCorrectInput({
      $target: getDom('.correct-lotto--input'),
      inputCorrectLottoEvent: this.inputCorrectLottoEvent,
    });

    new LottoStatisticsModal({
      $target: getDom('.lotto-statistics-modal'),
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
      store.setState({ buyLottos: this.lottoMachine.lottos });
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

    store.setState({
      winningRanks: winningRanks.reverse(),
      profitRate,
      isModal: true,
    });
  };

  this.restart = () => {
    store.setState({
      buyLottos: [],
      winningRanks: [],
      profitRate: 0,
      isModal: false,
    });
  };

  // 실행
  this.setup();
}

export default App;
