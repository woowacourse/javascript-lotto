/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import './web/css/style.css';
import LottoGame from './domain/LottoGame.js';
import ModalWindow from './web/ModalWindow.js';
import Alert from './web/Alert.js';
import HTMLInputView from './web/HTMLInputView.js';
import Table from './web/Table.js';

const lottoGame = new LottoGame();
const moneyBtn = document.querySelector('.buy');
const showResultBtn = document.querySelector('button.show-results');
const closeModalBtn = document.querySelector('.modal-box button.close');
const [closeMoneyAlertBtn, closeWinningLottoAlertBtn] = document.querySelectorAll('.alert button.close');
const restartBtn = document.querySelector('.restart-game');

const showHiddenFeatures = () => {
  document.querySelectorAll('.hidden-first')
    .forEach((element) => { element.style.display = 'flex'; });
};

const showLottoList = (lottoList) => {
  document.querySelector('.lotto-count').innerHTML = `총 ${lottoList.length}개를 구매했습니다.`;
  document.querySelector('.lotto-list .list').innerHTML = lottoList
    .map((lottoNumbers) => `<p class="lotto">🎟️ ${lottoNumbers.join(', ')}</p>`)
    .join('');
};

const makeResultTable = () => {
  const rankingBoard = lottoGame.getRankingBoard();
  const table = Table.create();

  Table.addHead(table, ['일치 개수', '당첨금', '당첨 개수']);
  Table.addRow(table, ['3개', '5,000', `${rankingBoard.fifth}`]);
  Table.addRow(table, ['4개', '50,000', `${rankingBoard.fourth}`]);
  Table.addRow(table, ['5개', '1,500,000', `${rankingBoard.third}`]);
  Table.addRow(table, ['5개+보너스볼', '30,000,000', `${rankingBoard.second}`]);
  Table.addRow(table, ['6개', '2,000,000,000', `${rankingBoard.first}`]);

  return table;
};

const showResult = () => {
  const resultHeader = document.createElement('h1');
  const table = makeResultTable();
  const resultFooter = document.createElement('h3');

  const headerText = document.createTextNode('🏆 당첨 통계 🏆');
  const footerText = document.createTextNode(`당신의 총 수익률은 ${lottoGame.getEarningRate().toFixed(2)}% 입니다.`);

  resultHeader.appendChild(headerText);
  resultFooter.appendChild(footerText);

  ModalWindow.show();
  ModalWindow.addDomTree(resultHeader);
  ModalWindow.addDomTree(table);
  ModalWindow.addDomTree(resultFooter);
};

// main
moneyBtn.addEventListener('click', () => {
  try {
    const money = HTMLInputView.readMoney();
    Alert.hide('money');
    lottoGame.reset();
    lottoGame.buyLottos(money);
    showLottoList(lottoGame.getLottos());
    showHiddenFeatures();
  } catch (error) {
    Alert.show(error.message, 'money');
  }
});

showResultBtn.addEventListener('click', () => {
  try {
    const { winningNumbers, bonusNumber } = HTMLInputView.readWinningNumbersAndBonusNumber();
    Alert.hide('winning-numbers');
    lottoGame.updateRankingBoard(winningNumbers, bonusNumber);
    showResult();
  } catch (error) {
    Alert.show(error.message, 'winning-numbers');
  }
});

closeModalBtn.addEventListener('click', () => {
  ModalWindow.hide();
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
