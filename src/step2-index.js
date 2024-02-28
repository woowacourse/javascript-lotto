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

// domains
import LottoMachine from './domains/LottoMachine';

window.customElements.define('lotto-items', LottoItems);
window.customElements.define('payment-form', PaymentForm, { extends: 'form' });

document.addEventListener('DOMContentLoaded', () => {
  // TODO: 이벤트가 추가되면 이벤트 { 이름: 함수 }로 객체를 만들어 돌면서 실행해주는 방법도 괜찮을듯..
  document.addEventListener('paymentFormSubmit', (event) => {
    const { paymentAmount } = event.detail;

    try {
      new LottoMachine(paymentAmount);
    } catch (error) {
      alert(error.message);
    }
  });
});

// const GameController = {
//   paymentFormSubmit: () => {

//   },
// }
