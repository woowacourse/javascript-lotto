const InputWinningNumberBox = () => {
  return `
  <div id="input-winning-number-title">
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
  <form id="winning-number-submit">
    <div class="d-flex justify-content-between">
      <div>
        <input class="ball-box" name="main0" />
        <input class="ball-box" name="main1" />
        <input class="ball-box" name="main2" />
        <input class="ball-box" name="main3" />
        <input class="ball-box" name="main4" />
        <input class="ball-box" name="main5" />
      </div>
      <div>
        <input class="ball-box" name="bonus" />    
      </div>
    </div>
    <button class="width-100 btn lotto-primary lotto-greyscale-1" id="game-modal-open-button">결과 확인하기</button>
  </form>
  `;
};
export default InputWinningNumberBox;
