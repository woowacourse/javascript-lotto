import { getNeededLottoNumbers } from "../controller/getInputWIthRetryWeb.js";
import LottoStatus from "../domain/LottoStatus.js";

const checkResult = document.querySelector(".checkResult");

const clickCheckResult = () => {
  checkResult.addEventListener("click", () => {
    const { winningLotto, bonusLottoNumber } = getNeededLottoNumbers();
    if (winningLotto === undefined || bonusLottoNumber === undefined) return;

    document.dispatchEvent(
      new CustomEvent("checkResult", {
        detail: { winningLotto, bonusLottoNumber },
      })
    );

    console.log(winningLotto.getLottoNumbers(), bonusLottoNumber); // 입력된 로또 번호 확인
  });
};

export default clickCheckResult;
