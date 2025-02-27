import lottoStore from "../store/lottoStore.js";
import LottoStatus from "../domain/LottoStatus.js";
import LottoResult from "../domain/LottoResult.js";
import priceStore from "../store/priceStore.js";

const showResult = ({ winningLotto, bonusLottoNumber }) => {
  const lottoStatus = new LottoStatus({
    enteredLottoNumbers: winningLotto.getLottoNumbers(),
    bonusLottoNumber,
  });
  const lottos = lottoStore.getLottos();
  const lottosNumbers = lottos
    .getLottos()
    .map((lotto) => lotto.getLottoNumbers());

  const matchedStatus = lottoStatus.getMatchedLottoStatus(lottosNumbers);
  const price = priceStore.getPrice();
  const lottoResult = new LottoResult(matchedStatus, price);
  const winningHistory = lottoResult.getWinningHistory();
  const rate = lottoResult.getRate();

  const dialog = document.querySelector("dialog");
  dialog.showModal();

  Object.entries(winningHistory).forEach(([key, value]) => {
    if (value === 0) return;
    const countDiv = document.querySelector(`#rank${key}WinningCount`);
    countDiv.textContent = `${value}개`;
  });

  const rateDiv = document.querySelector("#rate");
  rateDiv.textContent = `당신의 총 수익률은 ${rate}%입니다.`;
};

export default showResult;
