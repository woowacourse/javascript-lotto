import $createLottoContent from './components/lottoContent/lottoContent.js';
import $lottoHeader from './components/lottoHeader/lottoHeader.js';
import $modal from './components/modal/modal.js';
import LottoMachine from './domain/model/LottoMachine.js';
import LottoStatistics from './domain/model/LottoStatistics.js';
import { validateLottoNumber, validateMoney } from './domain/validation.js';

const lottoStart = () => {
  const lottoMachine = new LottoMachine();
  const lottoContainer = document.getElementById('lottoContainer');
  lottoContainer.innerHTML = '';

  lottoContainer.appendChild($lottoHeader());

  const lottoBuyForm = document.getElementById('lottoBuyForm');
  lottoBuyForm.addEventListener('submit', (event) =>
    handleLottoPurchase(event, lottoMachine),
  );
};

const handleModalClose = () => {
  const modal1 = document.getElementById('modal');
  modal1.remove();
};

const handleModal = (event, result, revenueRate) => {
  event.preventDefault();
  document.getElementById('app').appendChild($modal(result, revenueRate));

  document.getElementById('restartButton').addEventListener('click', () => {
    handleModalClose();
    lottoStart();
  });

  document.getElementById('closeButton').addEventListener('click', () => {
    handleModalClose();
  });
};

const calculateRevenue = (lottoStatistics, money) => {
  const revenueRate = lottoStatistics.calculateRevenueRate(
    lottoStatistics.getProfit(),
    money,
  );

  return revenueRate;
};

const handleWinningResult = (event, { money, lottos }) => {
  event.preventDefault();
  try {
    const winningForm = document.getElementById('winningNumberInputForm');
    const winningNumbers = Array.from(winningForm.winningNumber).map((input) =>
      parseInt(input.value, 10),
    );

    validateLottoNumber(winningNumbers);
    const lottoStatistics = new LottoStatistics();
    lottoStatistics.compareLottos(lottos, {
      bonus: parseInt(winningForm.bonusNumber.value, 10),
      lotto: winningNumbers,
    });
    const revenueRate = calculateRevenue(lottoStatistics, money);
    const rankResult = lottoStatistics.getRankResult();
    handleModal(event, rankResult, revenueRate);
  } catch (error) {
    alert(error.message);
  }
};

const createLottos = (lottoMachine, money) => {
  lottoMachine.createLottos(money);
  return lottoMachine.getLottos();
};

const handleLottoPurchase = (event, lottoMachine) => {
  event.preventDefault();
  try {
    const money = document.getElementById('lottoBuyForm').money.value;
    validateMoney(money);
    const lottos = createLottos(lottoMachine, money);
    const lottoContainer = document.getElementById('lottoContainer');
    const lottoContent = $createLottoContent(lottos);
    lottoContainer.appendChild(lottoContent);
    lottoContent.addEventListener('submit', (e) =>
      handleWinningResult(e, { money, lottos }),
    );
  } catch (error) {
    alert(error.message);
  }
};

lottoStart();
