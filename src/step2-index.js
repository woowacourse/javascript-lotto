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
  // const lottoMachine =
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
