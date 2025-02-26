import lottoStore from "../store/lottoStore.js";
import LottoStatus from "../domain/LottoStatus.js";
import LottoResult from "../domain/LottoResult.js";
import priceStore from "../store/priceStore.js";

const showResult = () => {
  document.addEventListener("checkResult", (event) => {
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
  });
};

export default showResult;
