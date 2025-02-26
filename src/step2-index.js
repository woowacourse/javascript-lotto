/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoManager from "./domain/LottoManager";
import LottoPrize from "./domain/LottoPrize";
import { getPrice, getWinningLotto } from "./ui/input";
import { printLottoCount, printLottoResult, printLottos } from "./ui/output";

const handleModal = (prizeResultModal) => {
  const modalOpenStatus = window.getComputedStyle(prizeResultModal).display;
  console.log("status :", modalOpenStatus);
  if (modalOpenStatus === "none") {
    prizeResultModal.style.display = "flex";
  } else if (modalOpenStatus === "flex") {
    prizeResultModal.style.display = "none";
  }
};

const allowModalOpen = () => {
  const prizeResultModal = document.querySelector("modal");
  prizeResultModal.style.display = "flex";

  const prizeResultButton = document.querySelector(".result-contents");
  const closeButton = document.querySelector("modal .close-button");

  prizeResultButton.addEventListener("click", () =>
    handleModal(prizeResultModal)
  );
  closeButton.addEventListener("click", () => handleModal(prizeResultModal));
};

async function run() {
  const price = await getPrice();
  printLottoCount(price);
  const lottos = LottoManager.generateLottos(price);
  printLottos(lottos);

  const { winningNumbers, bonusNumber } = await getWinningLotto();

  const lottoPrize = new LottoPrize(lottos);
  const prizeResult = lottoPrize.calculateWinnings(winningNumbers, bonusNumber);
  const ROI = lottoPrize.calculateROI(price, prizeResult);

  allowModalOpen();
  printLottoResult(prizeResult, ROI);
  isReStart();
}
run();
