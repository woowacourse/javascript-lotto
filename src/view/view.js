const view = {
  readMoney() {
    return document.getElementById('money').value;
  },

  readWinningNumbersTag() {
    return document.querySelectorAll('#winning');
  },

  readBonusNumber() {
    return document.getElementById('bonus').value;
  },

  printPurchasedLottoNumber(lottoNumber) {
    const buyText = document.querySelector('.buyText');

    buyText.textContent = `총 ${lottoNumber}개를 구매했습니다.`;
    buyText.style.visibility = 'visible';
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

  showModal() {
    const modal = document.querySelector('.modal');
    modal.style.visibility = 'visible';
  },

  closeModal() {
    const modal = document.querySelector('.modal');
    modal.style.visibility = 'hidden';
  },
};

module.exports = view;
