/* eslint-disable max-lines-per-function */
const GameBox = () => {
  return `
<div class="border p-2">
  <div>🎱 내 번호 당첨 확인 🎱</div>
  <div>구입할 금액을 입력해주세요.</div>
  <form id="money-submit" class="d-flex">
    <input class="width-100" name="money"/>
    <button class="width-100" type="submit">구입</button>
  </form>
  <div id="purchase-result"></div>
  <div id="input-winning-number"></div>
</div>
`;
};
export default GameBox;
