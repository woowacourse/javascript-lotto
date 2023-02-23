import Comparer from '../../domain/Comparer';
import LottoMachine from '../../domain/LottoMachine';
import ProfitCalculator from '../../domain/ProfitCaculator';
import Validator from '../../domain/Validator';
import WinningLotto from '../../domain/WinningLotto';
import { $, $$ } from '../../util/dom';

const purchaseButton = $('.purchase-button');
const moneyInput = $('.money-input');
const issueLotto = $('.issueLotto');
const inputNumbersLayout = $('.inputNumbersLayout');
const lottos = $('.lottos');

const purchaseQuantity = $('.purchaseQuantity');

const printResultButton = $('.printResult-button');
const winningNumber = $$('.winningNumber-input');
const bonusNumber = $('.bonusNumber-input');

const modal = $('.modal');
const restartButton = $('.restart-button');

const matchCounts = $$('.matchCount');
const profitRate = $('.profitRate');

purchaseButton.onclick = async (e) => {
  e.preventDefault();
  lottos.innerHTML = ``;
  try {
    Validator.purchaseAmount(moneyInput.value);
    showLotto(moneyInput.value);
    window.localStorage.setItem('purchaseAmount', moneyInput.value);
  } catch (error) {
    alert(error.message);
  }
};

const showLotto = async (money) => {
  issueLotto.style.display = 'block';
  inputNumbersLayout.style.display = 'block';

  const lottoMachine = new LottoMachine(money);
  //구매갯수 출력
  purchaseQuantity.innerText = await lottoMachine.getQuantity();

  //로또번호 출력
  const lottosArray = Array.from({ length: lottoMachine.getQuantity() }, () =>
    lottoMachine.issueLotto(),
  );

  window.localStorage.setItem('lottosArray', JSON.stringify(lottosArray));
  lottosArray.forEach((lotto) => {
    lottos.innerHTML += `<div class="lotto">🎟️ ${lotto.join(', ')}</div>`;
  });
};

printResultButton.onclick = async (e) => {
  e.preventDefault();
  // const winningNumbers = new Array(6).fill().map((v, i) => Number(winningNumber[i].value));
  const winningNumbers = Array.from({ length: 6 }, (v, i) => Number(winningNumber[i].value));

  console.log(winningNumber);
  try {
    Validator.winningNumber(winningNumbers.join(','));
    Validator.bonusNumber(bonusNumber.value, winningNumbers);
    const winningLotto = new WinningLotto(winningNumbers, Number(bonusNumber.value));
    const ranking = new Comparer(
      winningLotto,
      JSON.parse(localStorage.getItem('lottosArray')),
    ).getStatistics();
    modal.style.display = 'flex';

    Object.entries(ranking).forEach(([rank, count], i) => {
      matchCounts[i].innerText = count;
    });

    profitRate.innerText = new ProfitCalculator(ranking).getProfitRate(
      localStorage.getItem('purchaseAmount'),
    );
  } catch (error) {
    alert(error.message);
  }
};

restartButton.onclick = async (e) => {
  e.preventDefault();
  modal.style.display = 'none';
  issueLotto.style.display = 'none';
  inputNumbersLayout.style.display = 'none';
};
