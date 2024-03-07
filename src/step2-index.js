// styles
import './styles/global.css';
import './styles/body.css';
import './styles/PaymentForm.css';
import './styles/PurchasedLottos.css';
import './styles/WinningLottoForm.css';
import './styles/Modal.css';
import './styles/Statistics.css';

// services
import WebController from './services/WebController';

// components
import Statistics from './views/web/components/Statistics';
import PurchasedLottos from './views/web/components/PurchasedLottos';
import PaymentForm from './views/web/components/PaymentForm';
import WinningLottoForm from './views/web/components/WinningLottoForm';
import Modal from './views/web/components/Modal';

window.customElements.define('statistics-result', Statistics);
window.customElements.define('purchased-lottos', PurchasedLottos);
window.customElements.define('payment-form', PaymentForm, { extends: 'form' });
window.customElements.define('winning-lotto-form', WinningLottoForm, { extends: 'form' });
window.customElements.define('app-modal', Modal);

const webController = new WebController();
