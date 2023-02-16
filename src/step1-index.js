/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LottoGame } from "./domain/LottoGame";

export const getRateOfReturn = (totalPrize, purchaseAmount) => {
  return Number(((totalPrize / purchaseAmount) * 100).toFixed(1));
};

const lottoGame = new LottoGame();
lottoGame.play();
