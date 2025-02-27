import lottoStore from "../store/lottoStore.js";
import LottoStatus from "../domain/LottoStatus.js";
import LottoResult from "../domain/LottoResult.js";
import priceStore from "../store/priceStore.js";

const showResult = (event) => {
  const { winningLotto, bonusLottoNumber } = event.detail;
  const lottoStatus = new LottoStatus({
    enteredLottoNumbers: winningLotto.getLottoNumbers(),
    bonusLottoNumber,
  });
  const lottos = lottoStore.getLottos();
  console.log(lottos);
  const lottosNumbers = lottoStore
    .getLottos()
    .map((lotto) => lotto.getLottoNumbers());

  const matchedStatus = lottoStatus.getMatchedLottoStatus(lottosNumbers);
  const price = priceStore.getPrice();
  console.log(matchedStatus); // 당첨 결과 확인
  const lottoResult = new LottoResult(matchedStatus, price);
  const winningHistory = lottoResult.getWinningHistory();
  const rate = lottoResult.getRate();

  const dialog = document.querySelector("dialog");
  dialog.showModal();
  console.log(winningHistory);
  console.log("당첨률:", rate);
  Object.entries(winningHistory).forEach(([key, value]) => {
    if (value === 0) return;
    const countDiv = document.querySelector(`#rank${key}WinningCount`);
    countDiv.textContent = `${value}개`;
  });
  const rateDiv = document.querySelector("#rate");
  rateDiv.textContent = `당신의 총 수익률은 ${rate}%입니다.`;
};

export default showResult;
