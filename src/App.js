// model
import LottoMachine from './domain/LottoMachine';
// component
import LottoMoneyInput from './components/LottoMoneyInput';
import '../css/reset.css';
import '../css/spacing.css';
import '../css/typograpy.css';
import '../css/styles.css';
import '../css/flexbox.css';

import { getDom } from './utils/dom';
import LottoCorrectInput from './components/LottoCorrectInput';
import LottoStatistics from './domain/LottoStatistics';

function App($target) {
  this.$root = $target;

  this.lottoMachine = new LottoMachine();

  this.state = {
    buyLottos: [],
    winningNumbers: [],
    bonusNumbers: 0,
  };

  this.template = () => `
    <header class="flex flex--v-Center lotto-header">
        <h1 class="lotto-subtitle mgLeft_10_rem">🎱 행운의 로또</h1>
    </header>
    <section class="flex flex--center w-100 mgBottom_5_rem">
      <div class="lotto-card mgTop_5_rem mgLeft_1_rem pd_1_rem">
        <h2 class="flex flex--h-center lotto-card__title lotto-subtitle mgTop_3_rem">
            🎱 내 번호 당첨 확인 🎱
        </h2>
        <div class="lotto-money"></div>
        <ul class="lotto-tickets lotto-body mgTop_2_rem"></ul>
        <div class="correct-lotto--input"></div>
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
    this.lottoMachine.purchase(money);

    this.setState({ buyLottos: this.lottoMachine.lottos });
  };

  // 실행
  this.render();
}

export default App;
