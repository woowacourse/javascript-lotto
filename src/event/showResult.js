import { getLottoNumbers } from "../controller/getInputWIthRetryWeb.js";

const showResult = () => {
  const checkResult = document.querySelector(".checkResult");
  checkResult.addEventListener("click", () => {
    const lottoNumbers = getLottoNumbers();
    console.log(lottoNumbers);
  });
};

export default showResult;
