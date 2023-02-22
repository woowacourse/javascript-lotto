/* eslint-disable max-lines-per-function */
const GameBox = () => {
  return `
<div class="border p-2">
  <div>🎱 내 번호 당첨 확인 🎱</div>
  <div>구입할 금액을 입력해주세요.</div>
  <div class="d-flex">
    <input class="width-100" id="money-input"/>
    <button class="width-100" id="purchase-button">구입</button>
  </div>
</div>
`;
};
export default GameBox;
