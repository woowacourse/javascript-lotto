import { $ } from "../Util/querySelector.js";

export const printPurchaseMountLabel = (lottoCount) => {
  $("#purchase-mount-label").innerText = `총 ${lottoCount}개를 구매하였습니다.`;
};

export const printLottoImages = (lottoCount) => {
  let lottoImageTemplate = "";

  for (let i = 0; i < lottoCount; i++) {
    lottoImageTemplate += '<span class="mx-1 text-4xl">🎟️ </span>';
  }

  $("#lotto-image-container").innerHTML = lottoImageTemplate;
};
