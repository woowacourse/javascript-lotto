const InputWinningNumberBox = () => {
  return `
  <div>
    지난 주 당첨 번호 6개와 보너스 번호 1개를 입력해주세요.
  </div>
  <div class="d-flex justify-content-between">
    <div>
      당첨 번호
    </div>
    <div>
      보너스 번호
    </div>
  </div>
  <div class="d-flex justify-content-between">
    <div>
      <input/>
      <input/>
      <input/>
      <input/>
      <input/>
      <input/>
    </div>
    <div>
      <input/>
    </div>
  </div>
  <div>
    <button class="width-100">결과 확인하기</button>
  </div>
  `;
};
export default InputWinningNumberBox;
