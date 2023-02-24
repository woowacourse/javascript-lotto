import { MAGIC_NUMBER, RANK_INFORMATIONS } from './constant';
import './css/styles.css';

const LottoMachine = require('./domain/controller/LottoMachine');
const Winning = require('./domain/model/Winning');
const Money = require('./domain/model/Money');
const Benefit = require('./domain/model/Benefit');

const lottoMachine = new LottoMachine();
const winning = new Winning();
const benefit = new Benefit();

const {
  moneyInput,
  bonusNumberInput,
  purchaseButton,
  confirmButton,
  retryButton,
  winningNumbersGroup,
  lottoContent,
  result,
  closeButton,
  count,
  rate,
  resultListContainer,
  lottoList,
} = require('./document');

purchaseButton.addEventListener('click', () => {
  saveMoney();
  purchaseButton.setAttribute('disabled', 'disabled');

  lottoMachine.generateLottos();
  renderLottoContent();
  renderWinningNumebersInput();
});

confirmButton.addEventListener('click', () => {
  saveWinning();
  confirmButton.setAttribute('disabled', 'disabled');

  const ranks = lottoMachine.getCollectedRanks();
  benefit.calculateRate(lottoMachine.getMoney().getAmount(), ranks);
  renderResult(ranks);
});

closeButton.addEventListener('click', () => {
  result.style.display = 'none';
});

retryButton.addEventListener('click', () => {
  window.location.reload();
});

const saveMoney = () => {
  try {
    const money = new Money(Number(moneyInput.value));
    lottoMachine.setMoney(money);
  } catch (error) {
    moneyInput.classList.add('invalid');
    window.alert(error.message);
    moneyInput.value = '';
  }
};

const saveWinning = () => {
  try {
    winning.setWinningNumbers(getWinningNumbersInput());
    winning.setBonusNumber(Number(bonusNumberInput.value));
    lottoMachine.setWinning(winning);
  } catch (error) {
    window.alert(error.message);
  }
};

const renderLottoContent = () => {
  const lottoCount = lottoMachine.getLottoCount();
  const lottos = lottoMachine.getLottos();

  count.innerHTML = lottoCount;
  lottoList.innerHTML = lottos
    .map(
      (lotto) =>
        `<div id="lotto" class="lotto-container">
        <div class="lotto-image">🎟</div>
        <div id="lottoNumbers" class="lotto-numbers normal-font">${lotto.join(
          ', '
        )}</div>
      </div>`
    )
    .join('');
  lottoContent.classList.remove('hidden');
};

const renderWinningNumebersInput = () => {
  winningNumbersGroup.innerHTML = [...Array(MAGIC_NUMBER.winningNumberCount)]
    .map(() => '<input class="number-input" />')
    .join('');
};

const renderResult = (ranks) => {
  resultListContainer.innerHTML = RANK_INFORMATIONS.reverse()
    .map((rankInformation, index) => {
      return `<div class="result-list space-between">
    <p class="result-item">${rankInformation.matched}</p>
    <p class="result-item">${rankInformation.reward.toLocaleString()}</p>
    <p class="result-item">${ranks[4 - index]}개</p>
    </div>`;
    })
    .join('');
  rate.innerHTML = benefit.getRate();
  result.style.display = 'flex';
};

const getWinningNumbersInput = () => {
  const winningNumbersInput = [...Array(MAGIC_NUMBER.winningNumberCount)].map(
    (__, index) => {
      const numberInput = document.querySelector(
        `#winningNumbersGroup > input:nth-child(${index + 1})`
      );
      return Number(numberInput.value);
    }
  );

  return winningNumbersInput;
};
