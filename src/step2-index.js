import $createLottoContent from './components/lottoContent/lottoContent.js';
import $lottoHeader from './components/lottoHeader/lottoHeader.js';
import LottoMachine from './domain/model/LottoMachine.js';
import LottoStatistics from './domain/model/LottoStatistics.js';
import { validateLottoNumber, validateMoney } from './domain/validation.js';

const $createLottoHeader = () => $lottoHeader();

const handleWinningResult = (event, { money, lottos }) => {
  event.preventDefault();
  try {
    const winningForm = document.getElementById('winningNumberInputForm');
    const winningNumbers = validateLottoNumber(
      Array.from(winningForm.winningNumber).map((input) =>
        parseInt(input.value, 10),
      ),
    );

    const lottoStatistics = new LottoStatistics();
    lottoStatistics.compareLottos(lottos, {
      bonus: parseInt(winningForm.bonusNumber.value, 10),
      lotto: winningNumbers,
    });
  } catch (error) {
    return alert(error.message);
  }
};

const createLottos = (money) => {
  const lottoMachine = new LottoMachine();
  lottoMachine.createLottos(money);
  return lottoMachine.getLottos();
};

const handleLottoPurchase = (event) => {
  event.preventDefault();
  try {
    const money = document.getElementById('lottoBuyForm').money.value;
    validateMoney(money);
    const lottos = createLottos(money);
    const lottoContainer = document.getElementById('lottoContainer');
    lottoContainer.appendChild($createLottoContent(lottos));
    const winningForm = document.getElementById('winningNumberInputForm');
    winningForm.addEventListener('submit', (event) =>
      handleWinningResult(event, { money, lottos }),
    );
  } catch (error) {
    return console.log(error);
  }
};

const lottoStart = () => {
  const lottoContainer = document.getElementById('lottoContainer');
  lottoContainer.innerHTML = '';

  lottoContainer.appendChild($createLottoHeader());
};

lottoStart();

document
  .getElementById('lottoBuyForm')
  .addEventListener('submit', handleLottoPurchase);
