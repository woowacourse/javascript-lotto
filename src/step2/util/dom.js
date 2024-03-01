const domSelector = {
  lottoPrice: document.querySelector('.thousandUnitInput'),
  lottoPriceButton: document.querySelector('.lottoPriceButton'),
  generatedLottos: document.getElementById('generatedLottos'),
  afterBuyLottos: document.querySelector('.afterBuyLottos'),

  inputWinningLottos: document.querySelectorAll('.inputWinningLottos'),
  checkResultButton: document.querySelector('.checkResultButton'),
  inputBonusLotto: document.querySelector('.inputBonusLotto'),
  totalProfit: document.querySelector('.totalProfit'),

  modal: document.querySelector('.modal'),
  restartButton: document.querySelector('.restartButton'),
  close: document.getElementById('close'),

  winningStatistics: document.getElementById('winningStatistics'),
};

export default domSelector;
