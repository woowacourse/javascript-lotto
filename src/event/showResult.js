import lottoStore from "../store/lottoStore.js";
import LottoStatus from "../domain/LottoStatus.js";
import LottoResult from "../domain/LottoResult.js";
import priceStore from "../store/priceStore.js";

const showResult = ({ winningLotto, bonusLottoNumber }) => {
  const { winningHistory, rate } = getLottoResults(
    winningLotto,
    bonusLottoNumber
  );

  updateWinningHistoryDisplay(winningHistory);

  updateRateDisplay(rate);

  showDialog();
};

const updateWinningHistoryDisplay = (winningHistory) => {
  Object.entries(winningHistory).forEach(([key, value]) => {
    if (value === 0) return;
    const countDiv = document.querySelector(`#rank${key}WinningCount`);
    countDiv.textContent = `${value}개`;
  });
};

const showDialog = () => {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
};

const updateRateDisplay = (rate) => {
  const rateDiv = document.querySelector("#rate");
  rateDiv.textContent = `당신의 총 수익률은 ${rate.toFixed(1)}%입니다.`;
};

const getLottoResults = (winningLotto, bonusLottoNumber) => {
  const lottoStatus = new LottoStatus({
    enteredLottoNumbers: winningLotto.getLottoNumbers(),
    bonusLottoNumber,
  });

  const lottosNumbers = lottoStore
    .getLottos()
    .map((lotto) => lotto.getLottoNumbers());

  const matchedStatus = lottoStatus.getMatchedLottoStatus(lottosNumbers);
  const price = priceStore.getPrice();
  const lottoResult = new LottoResult(matchedStatus, price);

  return {
    winningHistory: lottoResult.getWinningHistory(),
    rate: lottoResult.getRate(),
  };
};

export default showResult;
