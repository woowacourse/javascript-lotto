/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import PurchaseSection from './web/Section/PurchaseSection'
import './web/css/reset.css'
import './web/css/index.css'
import './web/css/purchaseSection.css'
import './web/css/randomSection.css'
import './web/css/winNumberSection.css'
import './web/css/modal.css'
import './web/css/asset.css'

PurchaseSection.initPurchaseEvent();
