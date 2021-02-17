import { $ } from "../Util/querySelector.js"

export const printPurchaseMountLabel = (lottoCount) => {
  $("#purchase-mount-label").innerText = `총 ${lottoCount}개를 구매하였습니다.`
}