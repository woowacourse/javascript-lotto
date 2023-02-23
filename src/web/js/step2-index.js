import InputChecker from './validators/InputChecker.js';
import LottoGame from './domains/LottoGame.js';
import tagGenerator from './utils/tagGenerators.js';
import LINK from './constants/link.js';
import { $ } from './utils/dom.js';

const App = {
  init: function () {
    this.initEventListeners();
  },

  render: {
    lottos: lottos => {
      $('#lottos').innerHTML = tagGenerator.generateLottos(lottos);
    },

    winningNumbers: () => {
      $('#winning-numbers').innerHTML =
        tagGenerator.generateWinningNumberTags();

      $('#winning-numbers-form').addEventListener('submit', event =>
        event.preventDefault()
      );
    },

    result: (dialog, resultData) => {
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
					<td>${resultData.amountOfRanks[resultData.amountOfRanks.length - 1]}개</td>
				</tr>
				<tr>
					<td>4개</td>
					<td>50,000</td>
					<td>${resultData.amountOfRanks[resultData.amountOfRanks.length - 2]}개</td>
				</tr>
				<tr>
					<td>5개</td>
					<td>1,500,000</td>
					<td>${resultData.amountOfRanks[resultData.amountOfRanks.length - 3]}개</td>
				</tr>
				<tr>
					<td>5개 + 보너스 볼</td>
					<td>30,000,000</td>
					<td>${resultData.amountOfRanks[resultData.amountOfRanks.length - 4]}개</td>
				</tr>
				<tr>
					<td>6개</td>
					<td>2,000,000,000</td>
					<td>${resultData.amountOfRanks[resultData.amountOfRanks.length - 5]}개</td>
				</tr>
			</table>
			<span id="profit-text">당신의 총 수익률은 ${resultData.profit}%입니다.</span>
			<input id="retry-button" type="button" value="다시 시작하기">
		</div>`;

      $('#exit-button').addEventListener('click', () => {
        dialog.close();
      });
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

    $('#price-form').addEventListener('submit', event =>
      this.purchaseLottos(event)
    );
  },

  purchaseLottos: function (event) {
    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData);
    const price = InputChecker.checkLottoPrice(fields.price);
    if (!price) {
      return;
    }
    LottoGame.init(price);

    this.render.lottos(LottoGame.getLottos());
    this.render.winningNumbers();
    $('#winning-numbers-form').addEventListener('submit', event =>
      this.calculateResult(event)
    );
  },

  calculateResult: function (event) {
    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData);
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

    const dialog = $('dialog');
    dialog.showModal();
    dialog.addEventListener('click', event => {
      if (event.target.nodeName === 'DIALOG') {
        dialog.close();
      }
    });

    LottoGame.initWinningNumbers({ luckyNumbers, bonusNumber });
    const resultData = {
      amountOfRanks: LottoGame.drawLotto(),
      profit: LottoGame.calculateProfit(),
    };

    this.render.result(dialog, resultData);
  },
};

const app = App;
app.init();
