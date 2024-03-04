/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import LottoStoreBox from "./step2/web/LottoStoreBox.js";
import WinningLottoForm from "./step2/web/WinningLottoForm.js";
import LottoResultModal from "./step2/web/LottoResultModal.js";
import "./css/style.css";

LottoStoreBox.addSubmitEvent();
WinningLottoForm.addSubmitEvent();
LottoResultModal.addClickEvents();
