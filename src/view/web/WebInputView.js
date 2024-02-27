const WebInputView = {
  //TODO: 여기가 맞을까?
  resetLottoGame() {
    this.resetMoneyInput();
    $('#winning-statistics-modal').classList.add('hidden');
    $('#my-lottos-section').classList.add('hidden');
    $('#winning-lotto-section').classList.add('hidden');
  },

  resetMoneyInput() {
    $('#money-input').value = '';
    $('#money-input').focus();
  },
};

export default WebInputView;
