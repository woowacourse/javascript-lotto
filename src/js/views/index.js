import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/elementSelector';
import { ELEMENT_PROPERTY } from '../constants/elementProperty';
import { NUMBER } from '../constants/number';

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
    this.$alignConverter = findElement(SELECTOR.ALIGN_CONVERTER);
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

  // 내부 구현이 너무 길어져서 메서드를 분리
  renderAlignState(visibleState, lottoAmount = 0) {
    if (visibleState) {
      if (lottoAmount > NUMBER.LOTTO_SECTIONS_DEFALUT_CAPACITY_IN_DETAIL) {
        this.$lottoSection.style.height = this.#calculateVisibleLottoSectionHeight(lottoAmount);
        this.$alignConverter.setAttribute('disabled', true);
        setTimeout(() => {
          this.$lottoContainer.setAttribute('data-visible-state', visibleState);
          this.$alignConverter.removeAttribute('disabled');
        }, NUMBER.ANIMATION_TIME);
        return;
      }
      this.$lottoContainer.setAttribute('data-visible-state', visibleState);
      return;
    }
    this.$lottoContainer.setAttribute('data-visible-state', visibleState);
    this.$lottoSection.style.height = this.#calculateInvisibleLottoSectionHeight(lottoAmount);
  }

  #calculateVisibleLottoSectionHeight(lottoAmount) {
    return `${lottoAmount * ELEMENT_PROPERTY.HEIGHT_OF_ONE_LOTTO_ICON_LINE}px`;
  }

  #calculateInvisibleLottoSectionHeight(lottoAmount) {
    if (lottoAmount > NUMBER.LOTTO_SECTIONS_DEFALUT_CAPACITY_IN_ICON) {
      const linesOfLottoIcon = Math.ceil(
        (lottoAmount - NUMBER.LOTTO_SECTIONS_DEFALUT_CAPACITY_IN_ICON) /
          NUMBER.LOTTO_ELEMENT_PER_LINE
      );
      return `${
        linesOfLottoIcon * ELEMENT_PROPERTY.HEIGHT_OF_ONE_LOTTO_ICON_LINE +
        ELEMENT_PROPERTY.DEFAULT_HEIGHT_OF_LOTTO_SECTION
      }px`;
    }
    return `${ELEMENT_PROPERTY.DEFAULT_HEIGHT_OF_LOTTO_SECTION}px`;
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
