/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import Validator from "./Utils/Validator.js";
import LottoMachine from "./Domain/LottoMachine.js";
import OutputView from "./View/OutputView.js";

const inputPrice = document.querySelector("#inputPrice");
const purchaseButton = document.querySelector("#purchaseButton");

purchaseButton.addEventListener("click", () => {
  try {
    const purchasePrice = Validator.validatePurchasePrice(inputPrice.value);

    const lottoMachine = new LottoMachine();
    const lottos = lottoMachine.issueLottos(purchasePrice);

    OutputView.printLottoList(lottos);
  } catch (e) {
    window.alert(e.message);
  }
});
