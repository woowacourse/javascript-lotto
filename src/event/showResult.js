import lottoStore from "../store/lottoStore.js";
import LottoStatus from "../domain/LottoStatus.js";
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
    console.log(matchedStatus); // 당첨 결과 확인
  });
};

export default showResult;
