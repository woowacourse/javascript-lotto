import View from './View';

const template = {
  showProfitMessage: profitRate => `당신의 총 수익률은 ${profitRate}%입니다.`
};

export default class WinningLottosView extends View {
  restartPurchase() {
    $(SELECTOR.ID.LOTTO_RESULT_SECTION).hidden = true;
    $(SELECTOR.ID.WINNING_NUMBER_FORM).hidden = true;
    $(SELECTOR.ID.PURCHASE_MONEY_INPUT).disabled = false;
    $(SELECTOR.ID.PURCHASE_MONEY_BUTTON).disabled = false;
  }

  clearWinningNumbersInput() {
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach(
      element => (element.value = '')
    );
  }

  clearMoneyInput() {
    $(SELECTOR.ID.PURCHASE_MONEY_INPUT).value = '';
  }

  resetToggle() {
    $(SELECTOR.ID.TOGGLE_CHECKBOX).checked = false;
  }

  toggleModal() {
    $(SELECTOR.CLASS.MODAL).classList.toggle('show');
  }

  renderWinLottosCountInModal(winLottos, winLottosWithBonus) {
    $$(SELECTOR.CLASS.COINCIDE_COUNT).forEach((element, index) => {
      element.textContent = `${winLottos[index + 3]}개`;
    });
    $(SELECTOR.ID.COINCIDE_COUNT_BONUS).textContent = `${winLottosWithBonus}개`;
  }

  renderProfitRateInModal(profitRate) {
    $(SELECTOR.ID.SHOW_PROFIT_RATE).textContent =
      template.showProfitMessage(profitRate);
  }
}
