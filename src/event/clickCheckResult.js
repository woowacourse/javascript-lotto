import { getNeededLottoNumbers } from "../controller/getInputWIthRetryWeb.js";
import LottoStatus from "../domain/LottoStatus.js";

const clickCheckResult = () => {
  const { winningLotto, bonusLottoNumber } = getNeededLottoNumbers();
  if (winningLotto === undefined || bonusLottoNumber === undefined) return;

  document.dispatchEvent(
    new CustomEvent("checkResult", {
      detail: { winningLotto, bonusLottoNumber },
    })
  );

};

export default clickCheckResult;
