import './web/css/reset.css';
import './web/css/button.css';
import './web/css/gameInput.css';
import './web/css/gameResult.css';
import './web/css/layout.css';
import './web/css/main.css';
import './web/css/title.css';
import lottoWebController from './controller/lottoWebController.js';

lottoWebController.lottoWebGamePlay();
/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
