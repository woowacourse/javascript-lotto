import { LOTTO } from "../config/const";

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

const printLottos = (lottos) => {
  const lottoContents = document.querySelector(".lotto-contents");
  const lottosContainer = document.createElement("div");

  const lottoObjects = lottos.map((lotto) => createLottoObject(lotto));
  lottoObjects.forEach((lottoObject) => {
    lottosContainer.appendChild(lottoObject);
  });

  lottoContents.appendChild(lottosContainer);
};

export { printLottoCount, printLottos };
