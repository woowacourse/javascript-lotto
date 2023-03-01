const Payment = () => {
  return `
    <form id="payment-form" action="">
      <label>
        구입할 금액을 입력해주세요.
        <input class="money-input" type="text" placeholder="금액" maxLength="8"/>
      </label>
      <button class="lotto-button purchase-button caption" type="submit">구입</button>
    </form>
  `;
};

export default Payment;
