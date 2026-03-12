import LottoMachine from "./Domain/LottoMachine.js";

class WebApp {
  run() {
    // DOM 요소 가져오기
    const purchaseForm = document.querySelector("#purchase-price-form");
    const purchaseInput = document.querySelector("#purchase-price");

    const lottoListSection = document.querySelector("#lotto-list-section");
    const lottoCountText = document.querySelector("#lotto-count-text");
    const lottoList = document.querySelector("#lotto-list");

    // 콘솔관련 유틸을 제거하기 위한 재정의
    const generateRandomNumber = () => {
      const nums = new Set();
      while(nums.size < 6) {
        nums.add(Math.floor(Math.random() * 45) + 1);
      }

      return [...nums];
    };

    // 이벤트 리스너 작성
    purchaseForm.addEventListener("submit", (event) => {
      // 브라우저 새로고침 차단
      event.preventDefault();

      try {
        // 로또 가격 읽어오기
        const purchasePriceStr = purchaseInput.value;

        // 가격에 맞추어 로또 발행
        const lottos = LottoMachine.issueLottos(
          purchasePriceStr,
          generateRandomNumber,
        );

        // 불러온 로또를 기반으로 로또 목록 출력 필요
        // 구입금액 입력 전 숨겨져 있던 창 숨김해제
        lottoListSection.classList.remove("hidden");

        // 총 구입 갯수 문구 업데이트
        lottoCountText.innerText = `총 ${lottos.length}개를 구입하셨습니다.`;

        // 로또 목록 출력 형태에 맞춰 HTML 파일에 업데이트
        const lottosHTML = lottos
          .map((lotto) => {
            return `<div class="lotto-ticket">🎟️ ${lotto.getNumbers().join(", ")} </div>`;
          })
          .join("");
        lottoList.innerHTML = lottosHTML;
      } catch (e) {
        alert(e.message);
      }
    });

    
  }
}

export default WebApp;