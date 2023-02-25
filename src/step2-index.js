/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './web/css/style.css';
import LottoGame from './domain/LottoGame.js';
import ModalWindow from './web/ModalWindow.js';
import Alert from './web/Alert.js';
import HTMLInputView from './web/HTMLInputView.js';
import HTMLOutputView from './web/HTMLOutputView.js';

const lottoGame = new LottoGame();

const moneyInput = document.querySelector('.money-input');
const singleNumberInputs = Array.from(document.querySelectorAll('.single-number-input'));

const moneyBtn = document.querySelector('.buy');
const showResultBtn = document.querySelector('button.show-results');
const closeModalBtn = document.querySelector('.modal-box button.close');
const [closeMoneyAlertBtn, closeWinningLottoAlertBtn] = document.querySelectorAll('.alert button.close');
const restartBtn = document.querySelector('.restart-game');

const modalBackground = document.querySelector('.modal-background');

const moneyInputCallback = () => {
  try {
    const money = HTMLInputView.readMoney();
    Alert.hide('money');
    lottoGame.reset();
    lottoGame.buyLottos(money);
    HTMLOutputView.showLottoList(lottoGame.getLottos());
    HTMLOutputView.showHiddenFeatures();
  } catch (error) {
    Alert.show(error.message, 'money');
  }
};

const winningNumbersInputCallback = () => {
  try {
    const { winningNumbers, bonusNumber } = HTMLInputView.readWinningNumbersAndBonusNumber();
    Alert.hide('winning-numbers');
    lottoGame.updateRankingBoard(winningNumbers, bonusNumber);
    HTMLOutputView.showResult(lottoGame.getRankingBoard(), lottoGame.getEarningRate());
  } catch (error) {
    Alert.show(error.message, 'winning-numbers');
  }
};

// main
moneyBtn.addEventListener('click', moneyInputCallback);

moneyInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') moneyInputCallback();
});

showResultBtn.addEventListener('click', winningNumbersInputCallback);

singleNumberInputs.forEach((element) => {
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') winningNumbersInputCallback();
  });
});

closeModalBtn.addEventListener('click', () => {
  ModalWindow.hide();
});

modalBackground.addEventListener('click', (event) => {
  if (event.target === modalBackground) ModalWindow.hide();
});

closeMoneyAlertBtn.addEventListener('click', () => {
  Alert.hide('money');
});

closeWinningLottoAlertBtn.addEventListener('click', () => {
  Alert.hide('winning-numbers');
});

restartBtn.addEventListener('click', () => {
  window.location.reload();
});
