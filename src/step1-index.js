/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import lottoController from "./controllers/LottoController.js";
import { getLottoPrice, getRestart } from "./view/input.js";

const run = async () => {
  const price = await getLottoPrice();
  await lottoController(price);

  if (await getRestart()) run();
};

run();
