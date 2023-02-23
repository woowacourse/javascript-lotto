import InputChecker from './validators/InputChecker.js';
import LottoGame from './domains/LottoGame.js';
import tagGenerator from './utils/tagGenerators.js';
import LINK from './constants/link.js';
import { $ } from './utils/dom.js';

const App = {
  state: {
    winningNumbers: {},
    result: {},
  },

  init: function () {
    this.initEventListeners();
  },

  renderResult: function (dialog) {
    dialog.innerHTML = `<div id="result">
		<input id="exit-button" type="button" value="❎">
		<span id="result-title">🏆 당첨 통계 🏆</span>
		<table id="result-table">
			<tr>
				<th scope="col">일치 갯수</th>
				<th scope="col">당첨금</th>
				<th scope="col">당첨 갯수</th>
			</tr>
			<tr>
				<td>3개</td>
				<td>5,000</td>
				<td>${
          this.state.result.amountOfRanks[
            this.state.result.amountOfRanks.length - 1
          ]
        }개</td>
			</tr>
			<tr>
				<td>4개</td>
				<td>50,000</td>
				<td>${
          this.state.result.amountOfRanks[
            this.state.result.amountOfRanks.length - 2
          ]
        }개</td>
			</tr>
			<tr>
				<td>5개</td>
				<td>1,500,000</td>
				<td>${
          this.state.result.amountOfRanks[
            this.state.result.amountOfRanks.length - 3
          ]
        }개</td>
			</tr>
			<tr>
				<td>5개 + 보너스 볼</td>
				<td>30,000,000</td>
				<td>${
          this.state.result.amountOfRanks[
            this.state.result.amountOfRanks.length - 4
          ]
        }개</td>
			</tr>
			<tr>
				<td>6개</td>
				<td>2,000,000,000</td>
				<td>${
          this.state.result.amountOfRanks[
            this.state.result.amountOfRanks.length - 5
          ]
        }개</td>
			</tr>
		</table>
		<span id="profit-text">당신의 총 수익률은 ${
      this.state.result.profit
    }%입니다.</span>
		<input id="retry-button" type="button" value="다시 시작하기">
	</div>`;
  },

  render: {
    lottos: lottos => {
      $('#lottos').innerHTML = tagGenerator.generateLottos(lottos);
    },

    winningNumbers: () => {
      $('#winning-numbers').innerHTML =
        tagGenerator.generateWinningNumberTags();
    },
  },

  initEventListeners: function () {
    $('#price-form').addEventListener('submit', event =>
      event.preventDefault()
    );

    $('#header-button').addEventListener(
      'click',
      () => (window.location = LINK.HOME)
    );

    $('#price-form').addEventListener('submit', event => {
      this.purchaseLottos(event);
    });
  },

  getFormData: function (target) {
    const formData = new FormData(target);

    return Object.fromEntries(formData);
  },

  purchaseLottos: function (event) {
    const fields = this.getFormData(event.target);
    const price = InputChecker.checkLottoPrice(fields.price);
    if (!price) {
      return;
    }

    LottoGame.init(price);

    this.render.lottos(LottoGame.getLottos());
    this.render.winningNumbers();

    $('#winning-numbers-form').addEventListener('submit', event => {
      event.preventDefault();
    });
    $('#winning-numbers-form').addEventListener('submit', event => {
      this.calculateResult(event);
      this.loadDialog();
    });
  },

  calculateResult: function (event) {
    const fields = this.getFormData(event.target);
    const luckyNumbersInput = Array.from(
      { length: 6 },
      (_, index) => fields[`lucky-number-${index + 1}`]
    );
    const bonusNumberInput = fields['bonus-number'];
    const luckyNumbers = InputChecker.checkLuckyNumbers(luckyNumbersInput);
    if (!luckyNumbers) {
      return;
    }
    const bonusNumber = InputChecker.checkBonusNumber(
      bonusNumberInput,
      luckyNumbers
    );
    if (!bonusNumber) {
      return;
    }

    this.state.winningNumbers = { luckyNumbers, bonusNumber };
  },

  loadDialog: function () {
    const dialog = $('dialog');
    dialog.showModal();

    dialog.addEventListener('click', event => {
      if (event.target.nodeName === 'DIALOG') {
        dialog.close();
      }
    });

    LottoGame.initWinningNumbers(this.state.winningNumbers);
    if (Object.keys(this.state.result).length === 0) {
      this.state.result = {
        amountOfRanks: LottoGame.drawLotto(),
        profit: LottoGame.calculateProfit(),
      };
    }

    this.renderResult(dialog);

    $('#exit-button').addEventListener('click', () => dialog.close());

    $('#retry-button').addEventListener('click', () =>
      window.location.reload()
    );
  },
};

const app = App;
app.init();
