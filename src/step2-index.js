/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import '../css/style.css';
import LottoGameValidator from './view/LottoValidator.js';
import LottoGame from './domain/LottoGame.js';

const lottoGame = new LottoGame();

const ModalWindow = {
  show(message = '&nbsp;') {
    document.querySelector('.modal-background').style.display = 'flex';
    document.querySelector('.modal-message').innerHTML = message;
  },

  hide() {
    document.querySelector('.modal-message').innerHTML = '&nbsp;';
    document.querySelector('.modal-background').style.display = 'none';
  },

  addDomTree(tree) {
    document.querySelector('.modal-background').style.display = 'flex';
    document.querySelector('.modal-message').appendChild(tree);
  },
};

const Alert = {
  show(message, otherClasses = '') {
    const [alertDiv] = document.getElementsByClassName(['alert', otherClasses].join(' '));
    alertDiv.querySelector('p').innerHTML = `${message}`;
    alertDiv.style.display = 'flex';
  },

  hide(otherClasses = '') {
    const [alertDiv] = document.getElementsByClassName(['alert', otherClasses].join(' '));
    alertDiv.style.display = 'none';
  },
};

const HTMLInputView = {
  readMoney() {
    const money = document.querySelector('.money-input').value;

    LottoGameValidator.validateMoney(money);

    return Number(money);
  },

  readWinningNumbersAndBonusNumber() {
    const winningNumbers = Array.from(document.getElementsByClassName('single-number-input'))
      .map((element) => element.value);
    const bonusNumber = winningNumbers.pop();

    LottoGameValidator.validateWinningNumbers(winningNumbers);
    LottoGameValidator.validateBonusNumber(bonusNumber, winningNumbers.map(Number));

    return { winningNumbers: winningNumbers.map(Number), bonusNumber: Number(bonusNumber) };
  },
};

const showHiddenFeatures = () => {
  document.querySelectorAll('.hidden-first')
    .forEach((element) => { element.style.display = 'flex'; });
};

const showLottoList = (lottoList) => {
  document.querySelector('.lotto-count ').innerHTML = `<p>총 ${lottoList.length}개를 구매했습니다.`;
  document.querySelector('.lotto-list div').innerHTML = lottoList
    .map((lottoNumbers) => `<p class="lotto">🎟️ ${lottoNumbers.join(', ')}</p>`)
    .join('');
};

const Table = {
  create() {
    return document.createElement('table');
  },

  addHead(table, headList) {
    const thead = table.createTHead();
    const headRow = thead.insertRow();

    headList.forEach((headName) => {
      const content = document.createTextNode(headName);
      const th = document.createElement('th');
      th.appendChild(content);
      headRow.appendChild(th);
    });

    return table;
  },

  addRow(table, rowList) {
    const row = table.insertRow();

    rowList.forEach((rowContent) => {
      const content = document.createTextNode(rowContent);
      row.insertCell().appendChild(content);
    });

    return table;
  },
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

const moneyBtn = document.querySelector('.buy');
const showResultBtn = document.querySelector('button.show-results');
const closeModalBtn = document.querySelector('.modal-box button.close');
const [closeMoneyAlertBtn, closeWinningLottoAlertBtn] = document.querySelectorAll('.alert button.close');
const restartBtn = document.querySelector('.restart-game');

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
