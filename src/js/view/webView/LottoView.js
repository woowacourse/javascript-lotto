import LottoMachine from '../../domain/LottoMachine';
import Validator from '../../domain/Validator';
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

purchaseButton.onclick = async (e) => {
  e.preventDefault();
  lottos.innerHTML = ``;
  try {
    Validator.purchaseAmount(moneyInput.value);
    showLotto(moneyInput.value);
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
  lottosArray.forEach((lotto) => {
    lottos.innerHTML += `<div class="lotto">🎟️ ${lotto.join(', ')}</div>`;
  });
};

printResultButton.onclick = async (e) => {
  e.preventDefault();

  const winningNumbers = new Array(6).fill().map((v, i) => Number(winningNumber[i].value));

  try {
    console.log(winningNumbers);
    Validator.winningNumber([...winningNumbers].join(','));
    Validator.bonusNumber(bonusNumber.value, winningNumbers);
  } catch (error) {
    alert(error.message);
  }
};
