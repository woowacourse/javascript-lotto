import { $, $$ } from '../utils/selector.js';

export default class IssuedTicketView {
  constructor() {
    this.$ticketContainer = $('#ticket-container');
    this.$ticketCount = $('#ticket-count');
    this.$issuedTicketContainer = $('#issued-ticket-container');
    this.$lottoNumberToggle = $('#lotto-number-toggle');
  }

  getMoneyToPurchase() {
    return this.$purchaseInput.valueAsNumber;
  }
  //   - [x] 로또 구입 버튼을 누르면, 티켓을 볼 수 있는 section을 보여준다.
  renderTicketContainer() {
    this.$ticketContainer.classList.remove('hidden');
    this.$ticketContainer.classList.add('show');
  }

  //   - [ ] 로또 구입 버튼을 누르면, 구매한 티켓의 수를 보여준다.
  renderTicketCount() {}
}

// - [ ] 렌더링 (IssuedTicketView)
//   - [ ] 로또 구입 버튼을 누르면, 티켓을 볼 수 있는 section을 보여준다.
//   - [ ] 로또 구입 버튼을 누르면, 구매한 티켓의 수를 보여준다.
//   - [ ] (toggle off) 로또 구입 버튼을 누르면, 발급된 로또 개수 만큼 티켓을 보여준다.
//   - [ ] (toggle on) 토글버튼을 누르면, 각 티켓의 로또 번호를 보여준다.
