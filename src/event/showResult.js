import { getNeededLottoNumbers } from "../controller/getInputWIthRetryWeb.js";

const showResult = () => {
  const checkResult = document.querySelector(".checkResult");
  checkResult.addEventListener("click", () => {
    const { winningLotto, bonusLottoNumber } = getNeededLottoNumbers();
    console.log(winningLotto.getLottoNumbers(), bonusLottoNumber); // 입력된 로또 번호 확인
  });
};

export default showResult;
