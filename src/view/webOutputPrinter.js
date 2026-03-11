export const webOutputPrinter = {
  printMyLottoLists(randomLottos) {
    const myLotto = document.getElementById("myLotto");
    const myLottoLists = document.getElementById("myLottoLists");

    const newP = document.createElement("p");
    
    newP.innerText = `총 ${randomLottos.length}개를 구매하였습니다.`;
    myLotto.prepend(newP);

    for (const lotto of randomLottos) {
      const newLi = document.createElement('li');
      newLi.textContent = `🎟️ ${lotto.getNumber().join()}`;
      myLottoLists.appendChild(newLi);
    }

    const winningDiv = document.getElementById("winningDiv");
    winningDiv.style.display = "block";

    const getResultButton = document.getElementById("getResultButton");
    getResultButton.style.display = "block";
  }
}
