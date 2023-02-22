import { LottoController } from '../../controller/webController/LottoController';
import LottoMachine from '../../domain/LottoMachine';
import Validator from '../../domain/Validator';
import { $ } from '../../util/dom';

const purchaseButton = $('.purchase-button');
const moneyInput = $('.money-input');
const issueLotto = $('.issueLotto');
const inputNumbersLayout = $('.inputNumbersLayout');
const lottos = $('.lottos');

const purchaseQuantity = $('.purchaseQuantity');

purchaseButton.onclick = async (e) => {
  e.preventDefault();
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
