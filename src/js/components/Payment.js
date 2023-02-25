const Payment = () => {
  return `
    <div class="payment">
      <span>구입할 금액을 입력해주세요.</span>
      <div class="lotto-money">
        <input class="money-input" type="text" placeholder="금액" maxLength="8"/>
        <button class="lotto-button purchase-button caption">구입</button>
      </div>
    </div>
  `;
};

export default Payment;
