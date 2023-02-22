/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import '../css/style.css';
import LottoGameValidator from './view/LottoValidator.js';
import LottoGame from './domain/LottoGame.js';

const lottoGame = new LottoGame();

const ModalWindow = {
  show(message) {
    document.querySelector('.modal-background').style.display = 'flex';
    document.querySelector('.modal-message').innerHTML = message;
  },

  hide() {
    document.querySelector('.modal-background').style.display = 'none';
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

const showResult = () => {
  const rankingBoard = lottoGame.getRankingBoard();
  const message = [
    '<h1>🏆 당첨 통계 🏆</h1>',
    '<table>',
    '<tr> <th>일치 개수</th> <th>당첨금</th> <th>당첨 개수</th> </tr>',
    `<tr> <td>3개</td> <td>5,000</td> <td>${rankingBoard.fifth}개</td> </tr>`,
    `<tr> <td>4개</td> <td>50,000</td> <td>${rankingBoard.fourth}개</td> </tr>`,
    `<tr> <td>5개</td> <td>1,500,000</td> <td>${rankingBoard.third}개</td> </tr>`,
    `<tr> <td>5개+보너스볼</td> <td>30,000,000</td> <td>${rankingBoard.second}개</td> </tr>`,
    `<tr> <td>6개</td> <td>2,000,000,000</td> <td>${rankingBoard.first}개</td> </tr>`,
    '</table>',
    `<h3>당신의 총 수익률은 ${lottoGame.getEarningRate().toFixed(2)}% 입니다</h3>`,
    '<button type="button" class="restart-game">다시 시작하기</button>',
  ];
  ModalWindow.show(message.join(''));
};

const setRestartButton = () => {
  const restartBtn = document.querySelector('.restart-game');
  restartBtn.addEventListener('click', () => { window.location.reload(); });
};

const moneyBtn = document.querySelector('.buy');
const showResultBtn = document.querySelector('button.show-results');
const closeModalBtn = document.querySelector('.modal-box button.close');
const [closeMoneyAlertBtn, closeWinningLottoAlertBtn] = document.querySelectorAll('.alert button.close');

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
    setRestartButton();
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
