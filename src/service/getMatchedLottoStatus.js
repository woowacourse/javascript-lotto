import LottoStatus from "../domain/LottoStatus";

const getMatchedLottoStatus = ({ winningLotto, bonusLottoNumber, lottos }) => {
  const lottoStatus = new LottoStatus({
    enteredLottoNumbers: winningLotto.getLottoNumbers(),
    bonusLottoNumber,
  });

  const lottosNumbers = lottos.map((lotto) => lotto.getLottoNumbers());

  const matchedStatus = lottoStatus.getMatchedLottoStatus(lottosNumbers);
  return matchedStatus;
};

export default getMatchedLottoStatus;
