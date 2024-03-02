/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

// styles
import './styles/global.css';
import './styles/body.css';
import './styles/PaymentForm.css';
import './styles/PurchasedLottos.css';
import './styles/WinningLottoForm.css';

// domains
import WebController from './services/WebController';

// components
import PurchasedLottos from './views/web/components/PurchasedLottos';
import PaymentForm from './views/web/components/PaymentForm';
import WinningLottoForm from './views/web/components/WinningLottoForm';

window.customElements.define('purchased-lottos', PurchasedLottos);
window.customElements.define('payment-form', PaymentForm, { extends: 'form' });
window.customElements.define('winning-lotto-form', WinningLottoForm, { extends: 'form' });

const webController = new WebController();
