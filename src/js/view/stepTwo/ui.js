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

  hideRestUI() {
    domList.mainContainer.classList.add('hide');
  },

  renderLottosLengthText(lottosLength) {
    domList.lottoLengthText.innerText = `총 ${lottosLength}개를 구매하였습니다.`;
  },

  renderLottos(lottos) {
    lottos.forEach(lotto => {
      const lottoElement = createElem('li', 'class', 'lotto-container');
      lottoElement.innerText = `🎟 ${lotto.lottoNum.join(', ')}`;
      domList.lottoBox.appendChild(lottoElement);
    });
  },

  closeModal() {
    console.log('restart');
    domList.resultModal.style.display = 'none';
  },
};

export default ui;
