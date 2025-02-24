/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

document.addEventListener("DOMContentLoaded", () => {
  const lottoGame = document.getElementById("lottoGame");

  if (lottoGame) {
    const lottoGameTitle = document.createElement("h1"); // `title` 대신 `h1` 사용
    lottoGameTitle.classList.add("title");
    lottoGameTitle.innerText = "🎱 내 번호 당첨 확인 🎱";

    lottoGame.appendChild(lottoGameTitle);
  }
});
