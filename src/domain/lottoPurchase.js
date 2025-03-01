import $createLottoContent from '../components/lottoContent/lottoContent.js';
import handleWinningResult from './winningResult.js';
import { validateMoney } from './validation.js';

const createLottoContent = (lottos, money) => {
  const lottoContainer = document.getElementById('lottoContainer');
  const lottoContent = $createLottoContent(lottos);
  lottoContainer.appendChild(lottoContent);
  lottoContent.addEventListener('submit', (e) =>
    handleWinningResult(e, lottos, money),
  );
};

const createLottos = (lottoMachine, money) => {
  lottoMachine.createLottos(money);
  const lottoBuyForm = document.getElementById('lottoBuyForm');
  lottoBuyForm.money.readOnly = true;
  const buyButton = document.getElementById('buyButton');
  buyButton.disabled = true;
  buyButton.classList.add('disabled_button');
  return lottoMachine.getLottos();
};

const handleLottoPurchase = (e, lottoMachine) => {
  e.preventDefault();
  try {
    const money = document.getElementById('lottoBuyForm').money.value;
    validateMoney(money);
    const lottos = createLottos(lottoMachine, money);
    createLottoContent(lottos, money);
  } catch (error) {
    alert(error.message);
  }
};

export default handleLottoPurchase;
