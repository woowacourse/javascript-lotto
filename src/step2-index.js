/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

// styles
import './styles/global.css';
import './styles/body.css';
import './styles/PaymentForm.css';

// components
import LottoItems from './components/LottoItems';
import PaymentForm from './components/PaymentForm';

window.customElements.define('lotto-items', LottoItems);
window.customElements.define('payment-form', PaymentForm, { extends: 'form' });

// TODO: 이벤트 이름 객체 맵핑 객체 만들기
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('paymentFormSubmit', (event) => {
    console.log(event);
  });
});
