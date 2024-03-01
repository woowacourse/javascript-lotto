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

  winningStatistics: document.getElementById('winningStatistics'),

  restartButton: document.querySelector('#restartButton'),

  close: document.getElementById('close'),
};

export default domSelector;
