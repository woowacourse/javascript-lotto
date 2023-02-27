const view = {
  readMoney() {
    return document.getElementById('money').value;
  },

  readWinningNumber() {
    const winningNumber = [];
    const winningNumbersTag = document.querySelectorAll('.winning');

    winningNumbersTag.forEach((number, index) => {
      winningNumber[index] = number.value;
    });

    return winningNumber;
  },

  readBonusNumber() {
    return document.getElementById('bonus').value;
  },

  printPurchasedLottoNumber(lottoNumber) {
    const buyText = document.querySelector('.buyText');

    buyText.textContent = `총 ${lottoNumber}개를 구매했습니다.`;
    buyText.style.visibility = 'visible';
  },

  printLottoListElements(lottos) {
    const lottoList = document.querySelector('.lottoList');

    lottos.forEach(lotto => {
      const li = document.createElement('li');
      li.textContent = '🎟️' + lotto.toString();
      lottoList.append(li);
    });
  },

  printAllLotto() {
    const purchase = document.querySelector('.purchase');
    purchase.style.visibility = 'visible';
  },

  printResultLotto(result) {
    const result_lotto = document.querySelectorAll('#result');

    result_lotto.forEach((lotto, index) => {
      lotto.textContent = `${result[4 - index]}개`;
    });
  },

  printProfitResult(profitRate) {
    const profit = document.querySelector('.result_profit');
    profit.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  hidePuchase(){
    document.querySelector('.purchase').style.visibility = "hidden";
  },

  hideBuyText(){
    document.querySelector('.buyText').style.visibility = "hidden";
  },

  resetLottoList(){
    document.querySelector('.lottoList').replaceChildren();
  },

  showModal() {
    const modal = document.querySelector('.modal');
    modal.style.visibility = 'visible';
  },

  closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.visibility = 'hidden';
  },

  inputReset() {
    document.getElementById('money').value = null;

    document.querySelectorAll('.winning').forEach(number => {
      number.value = null;
    });

    document.getElementById('bonus').value = null;
  },
};

module.exports = view;
