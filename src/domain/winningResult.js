import handleModal from './modal';
import LottoStatistics from './model/LottoStatistics';
import { validateBonus, validateLottoNumber } from './validation';

const calculateRevenue = (lottoStatistics, money) => {
  const revenueRate = lottoStatistics.calculateRevenueRate(
    lottoStatistics.getProfit(),
    money,
  );

  return revenueRate;
};

const handleLottoStatistics = (lottoStatistics, lottos, winningNumberObj) => {
  lottoStatistics.compareLottos(lottos, winningNumberObj);

  const lottoResultButton = document.getElementById('lottoResultButton');
  lottoResultButton.textContent = '결과 다시 확인하기';
};

const handleLottoNumberValidate = () => {
  const winningForm = document.getElementById('winningNumberInputForm');
  const winningNumbers = Array.from(winningForm.winningNumber).map(
    (input) => input.valueAsNumber,
  );
  const bonusNumber = winningForm.bonusNumber.valueAsNumber;
  validateLottoNumber(winningNumbers);
  validateBonus(bonusNumber, winningNumbers);

  return {
    bonus: bonusNumber,
    lotto: winningNumbers,
  };
};

const handleWinningResult = (e, lottos, money) => {
  e.preventDefault();
  try {
    const winningNumberObj = handleLottoNumberValidate();
    const lottoStatistics = new LottoStatistics();
    handleLottoStatistics(lottoStatistics, lottos, winningNumberObj);
    const revenueRate = calculateRevenue(lottoStatistics, money);
    const rankResult = lottoStatistics.getRankResult();
    handleModal(e, rankResult, revenueRate);
  } catch (error) {
    alert(error.message);
  }
};

export default handleWinningResult;
