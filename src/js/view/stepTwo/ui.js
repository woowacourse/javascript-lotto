import domList from '@lotto/view/stepTwo/domList';
import createElem from '@lotto/utils/createElem';

const ui = {
  showMoneyValidationText({ message }) {
    domList.moneyInputErrorText.innerText = message;
    domList.moneyInputErrorText.classList.remove('hide');
  },

  hideMoneyValidationText() {
    domList.moneyInputErrorText.classList.add('hide');
  },

  showRestUI(lottos) {
    domList.mainContainer.classList.remove('hide');
    this.renderLottosLengthText(lottos.length);
    this.renderLottos(lottos);
  },

  renderLottosLengthText(lottosLength) {
    domList.lottoLengthText.innerText = `총 ${lottosLength}개를 구매하였습니다.`;
  },

  renderLottos(lottos) {
    domList.lottoBox.innerHTML = '';

    lottos.forEach(lotto => {
      const lottoElement = createElem('li', 'class', 'lotto-container');
      lottoElement.innerText = `🎟 ${lotto.lottoNum.join(', ')}`;
      domList.lottoBox.appendChild(lottoElement);
    });
  },

  hideTargetNumberValidationText() {
    domList.targetNumberInputErrorText.classList.add('hide');
  },

  showTargetNumberValidationText({ message }) {
    domList.targetNumberInputErrorText.innerText = message;
    domList.targetNumberInputErrorText.classList.remove('hide');
  },

  showModal() {
    domList.resultModal.style.display = 'block';
  },

  closeModal() {
    console.log('restart');
    domList.resultModal.style.display = 'none';
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

    domList.resultTableBody.innerHTML = resultTemplate;
    domList.ropText.innerText = `당신의 총 수익률은 ${rateOfProfit.toFixed(1)}%입니다.`;

    this.showModal();
  },
};

export default ui;
