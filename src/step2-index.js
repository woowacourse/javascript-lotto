import $lottoHeader from './components/lottoHeader/lottoHeader.js';
import handleLottoPurchase from './domain/lottoPurchase.js';
import LottoMachine from './domain/model/LottoMachine.js';

const lottoStart = () => {
  const lottoMachine = new LottoMachine();
  const lottoContainer = document.getElementById('lottoContainer');
  lottoContainer.innerHTML = '';

  lottoContainer.appendChild($lottoHeader());

  const lottoBuyForm = document.getElementById('lottoBuyForm');
  const handleLottoPurchaseSubmit = (e) => {
    handleLottoPurchase(e, lottoMachine);
  };
  lottoBuyForm.addEventListener('submit', handleLottoPurchaseSubmit);
};

lottoStart();

export default lottoStart;
