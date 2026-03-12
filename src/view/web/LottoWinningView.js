import {
  BonusNumberGroup,
  WinningNumberGroup,
} from "../../components/LottoWinningForm";

export const renderWinningInput = () => {
  const winningInputWrapper = document.querySelector("#winning-input-wrapper");

  winningInputWrapper.innerHTML = `
   <p class="form-title">
        지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
   </p>
   <form id="winning-form">
       ${WinningNumberGroup()} 
       ${BonusNumberGroup()}
       <button type="submit">결과 확인하기</button>
   </form>
   
  `;
};

export const renderWinningResult = () => {};
