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
  <form>
    <div class="d-flex justify-content-between">
      <div>
        <input class="ball-box"/>
        <input class="ball-box"/>
        <input class="ball-box"/>
        <input class="ball-box"/>
        <input class="ball-box"/>
        <input class="ball-box"/>
      </div>
      <div>
        <input class="ball-box"/>
      </div>
    </div>
    <div>
      <button class="width-100">결과 확인하기</button>
    </div>      
  </form>

  `;
};
export default InputWinningNumberBox;
