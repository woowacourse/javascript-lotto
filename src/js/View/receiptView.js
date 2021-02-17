import { $ } from "../Util/querySelector.js";

export const printPurchaseMountLabel = (lottoCount) => {
  $("#purchase-mount-label").innerText = `총 ${lottoCount}개를 구매하였습니다.`;
};

export const printLottoHorizontal = (lottoCount) => {
  let lottoImageTemplate = "";

  for (let i = 0; i < lottoCount; i++) {
    lottoImageTemplate +=
      '<div id="lotto-image-number" class="d-flex flex-wrap"> <span class="mx-1 text-4xl">🎟️</span></div>';
  }

  $("#lotto-image-number-container").innerHTML = lottoImageTemplate;
  $("#lotto-image-number-container").classList.remove("flex-col");
};

export const printLottoVertical = (lottos) => {
  const lottoImageNumberContainer = $("#lotto-image-number-container");
  let lottoImageNumberTemplate = "";

  lottos.map((lotto) => {
    lottoImageNumberTemplate += `<div id="lotto-image-number" class="d-flex flex-wrap"><span class="mx-1 text-4xl">🎟️</span><span id="lotto-number" class="mx-1 mt-1 text-xl">${lotto.numbers.join(
      ", "
    )}</span></div>`;
  });

  lottoImageNumberContainer.innerHTML = lottoImageNumberTemplate;
  $("#lotto-image-number-container").classList.add("flex-col");
};
