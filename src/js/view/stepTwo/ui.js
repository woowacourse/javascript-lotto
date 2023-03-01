import createElement from '@lotto/utils/createElement';
import { $, $$ } from '@lotto/utils/selector';

const ui = {
  domList: {
    buyBtn: $('.buy-btn'),
    moneyInput: $('.money-input'),
    moneyInputErrorText: $('.money-input-error-text'),
    mainContainer: $('.main-container'),
    lottoBox: $('.lotto-box'),
    lottoLengthText: $('.lotto-length-text'),
    targetNumberInputs: $$('.square-input'),
    resultBtn: $('.result-btn'),
    targetNumberInputErrorText: $('.target-number-input-error-text'),
    resultModal: $('#myModal'),
    resultTable: $('table'),
    resultTableBody: $('#myTableBody'),
    ropText: $('.rop-text'),
    retryBtn: $('.retry-btn'),
    closeModalBtn: $('.close'),
    allInputs: $$('input'),
  },

  getDomWithName(name) {
    return this.domList[name];
  },

  showMoneyValidationText({ message }) {
    this.domList.moneyInputErrorText.innerText = message;
    this.domList.moneyInputErrorText.classList.remove('hide');
  },

  hideMoneyValidationText() {
    this.domList.moneyInputErrorText.classList.add('hide');
  },

  showRestUI(lottos) {
    this.domList.mainContainer.classList.remove('hide');
    this.renderLottosLengthText(lottos.length);
    this.renderLottos(lottos);
  },

  hideRestUI() {
    this.domList.mainContainer.classList.add('hide');
  },

  renderLottosLengthText(lottosLength) {
    this.domList.lottoLengthText.innerText = `총 ${lottosLength}개를 구매하였습니다.`;
  },

  renderLottos(lottos) {
    this.domList.lottoBox.innerHTML = '';

    lottos.forEach(lotto => {
      const lottoElement = createElement({ tagName: 'li', type: 'class', name: 'lotto-container' });
      lottoElement.innerText = `🎟 ${lotto.lottoNum.join(', ')}`;
      this.domList.lottoBox.appendChild(lottoElement);
    });
  },

  hideTargetNumberValidationText() {
    this.domList.targetNumberInputErrorText.classList.add('hide');
  },

  showTargetNumberValidationText({ message }) {
    this.domList.targetNumberInputErrorText.innerText = message;
    this.domList.targetNumberInputErrorText.classList.remove('hide');
  },

  showModal() {
    this.domList.resultModal.style.display = 'block';
  },

  closeModal() {
    this.domList.resultModal.style.display = 'none';
  },

  resetAllInputValues() {
    [...this.domList.allInputs].forEach(input => {
      input.value = null;
    });
  },

  showFinalResult({ ranks, rateOfProfit }) {
    const reversedRanks = ranks.reverse();

    const resultTemplate = `
              <tr>
            <td>3개</td>
            <td>5,000</td>
            <td>${reversedRanks[0]}개</td>
          </tr>
          <tr>
            <td>4개</td>
            <td>5,0000</td>
            <td>${reversedRanks[1]}개</td>
          </tr>
          <tr>
            <td>5개</td>
            <td>150,000,000</td>
            <td>${reversedRanks[2]}개</td>
          </tr>
          <tr>
            <td>5개+보너스볼</td>
            <td>30,000,000</td>
            <td>${reversedRanks[3]}개</td>
          </tr>
          <tr>
            <td>6개</td>
            <td>2,000,000,000</td>
            <td>${reversedRanks[4]}개</td>
          </tr>
    `;

    this.domList.resultTableBody.innerHTML = resultTemplate;
    this.domList.ropText.innerText = `당신의 총 수익률은 ${rateOfProfit.toFixed(1)}%입니다.`;

    this.showModal();
  },
};

export default ui;
