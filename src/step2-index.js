/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./config/const";
import LottoManager from "./domain/LottoManager";

// input
const getPrice = async () => {
  return new Promise((resolve) => {
    const userInputPrice = document.querySelector(".input-contents input");
    const purchaseButton = document.querySelector(".input-contents button");

    purchaseButton.addEventListener("click", async () => {
      resolve(userInputPrice.value);
    });
  });
};

//output
const printLottoCount = (price) => {
  const lottoContents = document.querySelector(".lotto-contents");
  const lottoCountText = document.createElement("p");
  lottoCountText.className = "body";
  lottoCountText.innerText = `총 ${
    price / LOTTO.PURCHASE.unit
  }개를 구매하였습니다.`;
  lottoContents.appendChild(lottoCountText);
};

const createLottoObject = (lotto) => {
  const lottoContainer = document.createElement("div");
  lottoContainer.className = "lotto-container_lotto";
  const lottoImage = document.createElement("img");
  lottoImage.src = "./src/assets/lotto.png";
  const lottoNumbers = document.createElement("p");
  lottoNumbers.innerText = lotto.numbers.map((number) => number).join(", ");

  lottoContainer.appendChild(lottoImage);
  lottoContainer.appendChild(lottoNumbers);

  return lottoContainer;
};

const printUserLottos = (lottos) => {
  const lottoContents = document.querySelector(".lotto-contents");
  const lottosContainer = document.createElement("div");

  const lottoObjects = lottos.map((lotto) => createLottoObject(lotto));
  lottoObjects.forEach((lottoObject) => {
    lottosContainer.appendChild(lottoObject);
  });

  lottoContents.appendChild(lottosContainer);
};

async function run() {
  while (true) {
    const price = await getPrice();
    printLottoCount(price);
    const lottos = LottoManager.generateLottos(price);
    printUserLottos(lottos);
  }
}
run();
