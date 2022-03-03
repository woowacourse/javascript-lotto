import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/elementSelector';

class LottoGameView {
  constructor() {
    this.$purchasedMessage = findElement(SELECTOR.PURCHASED_MESSAGE);
    this.$lottoContainer = findElement(SELECTOR.LOTTO_CONTAINER);
    this.$lottoSection = findElement(SELECTOR.LOTTO_SECTION);
    this.$winNumberInputSection = findElement(SELECTOR.WIN_NUMBER_INPUT_SECTION);
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
    this.$lottoSection.setAttribute('data-visible-state', false);
    this.renderWinNumberInputSection(false);
    this.renderAlignState(false);
  }

  renderLottoSection(lottoList) {
    this.$lottoSection.setAttribute('data-visible-state', true);
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

  renderAlignState(visibleState, lottoAmount = 0) {
    if (visibleState) {
      this.$lottoSection.style.height = `${lottoAmount * 46.364}px`;
      setTimeout(() => {
        this.$lottoContainer.setAttribute('data-visible-state', visibleState);
      }, 500);
    } else {
      this.$lottoContainer.setAttribute('data-visible-state', visibleState);
      this.$lottoSection.style.height = `27vh`;
    }
  }

  renderWinNumberInputSection(visibleState) {
    this.$winNumberInputSection.setAttribute('data-visible-state', visibleState);
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
