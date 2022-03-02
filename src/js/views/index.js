import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/elementSelector';

class LottoGameView {
  constructor() {
    this.$purchasedMessage = findElement(SELECTOR.PURCHASED_MESSAGE);
    this.$lottoContainer = findElement(SELECTOR.LOTTO_CONTAINER);
    this.$resultModal = findElement(SELECTOR.RESULT_MODAL);
    this.$earningRateNotice = findElement(SELECTOR.EARNING_RATE_NOTICE);
    this.$firstGradeAmount = findElement(SELECTOR.FIRST_GRADE_AMOUNT);
    this.$secondGradeAmount = findElement(SELECTOR.SECOND_GRADE_AMOUNT);
    this.$thirdGradeAmount = findElement(SELECTOR.THIRD_GRADE_AMOUNT);
    this.$fourthGradeAmount = findElement(SELECTOR.FOURTH_GRADE_AMOUNT);
    this.$fifthGradeAmount = findElement(SELECTOR.FIFTH_GRADE_AMOUNT);
  }

  initialize() {
    this.$purchasedMessage.innerText = '';
    this.$lottoContainer.innerHTML = '';
  }

  renderLottoSection(lottoList) {
    this.$purchasedMessage.innerText = `총 ${lottoList.length}개를 구매하였습니다.`;
    this.$lottoContainer.innerHTML = lottoList
      .map((lotto) => this.generateLottoTemplate(lotto))
      .join('');
  }

  generateLottoTemplate({ lottoNumbers }) {
    return `<div class="lotto">
      <span>🎟️</span>
      <span class="number">${lottoNumbers.join(', ')}</span>
      </div>`;
  }

  renderAlignState(visibleState) {
    this.$lottoContainer.setAttribute('data-visible-state', visibleState);
  }

  openResultModal(resultArray) {
    this.$firstGradeAmount.innerText = `${resultArray[0]}개`;
    this.$secondGradeAmount.innerText = `${resultArray[1]}개`;
    this.$thirdGradeAmount.innerText = `${resultArray[2]}개`;
    this.$fourthGradeAmount.innerText = `${resultArray[3]}개`;
    this.$fifthGradeAmount.innerText = `${resultArray[4]}개`;
    this.$earningRateNotice.innerText = `당신의 총 수익률은 ${resultArray[5]}%입니다.`;

    this.$resultModal.setAttribute('data-visible-state', true);
  }

  closeResultModal() {
    this.$resultModal.setAttribute('data-visible-state', false);
  }
}
export default LottoGameView;
