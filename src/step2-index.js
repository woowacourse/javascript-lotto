import $createLottoContent from './components/lottoContent/lottoContent.js';
import $lottoHeader from './components/lottoHeader/lottoHeader.js';
import LottoMachine from './domain/model/LottoMachine.js';
import LottoStatistics from './domain/model/LottoStatistics.js';
import { validateMoney } from './domain/validation.js';

const $createLottoHeader = () => $lottoHeader();

const handleLottoPurchase = (event) => {
  try {
    event.preventDefault();
    const money = document.getElementById('lottoBuyForm').money.value;
    validateMoney(money);

    const lottoMachine = new LottoMachine();
    lottoMachine.createLottos(money);
    const lottoContainer = document.getElementById('lottoContainer');
    lottoContainer.appendChild($createLottoContent(lottoMachine.getLottos()));
  } catch (error) {
    return alert(error.message);
  }
};

const lottoStart = () => {
  const lottoStatistics = new LottoStatistics();

  const lottoContainer = document.getElementById('lottoContainer');
  lottoContainer.innerHTML = '';

  lottoContainer.appendChild($createLottoHeader());
};

lottoStart();

document
  .getElementById('lottoBuyForm')
  .addEventListener('submit', handleLottoPurchase);
