/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoDomain from "./domains/web/LottoDomain.js";
import View from "./views/web/View.js";
import LottoController from "./controllers/web/LottoController.js";

const domain = new LottoDomain();
const view = new View();
new LottoController(domain, view);
