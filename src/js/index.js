const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(
  ".lotto-numbers-toggle-button"
);

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

/*

state.js

utils.js

onABCClick.js
 - document,querySelector.innert = childChild()sfsdf_

onABCClick.js

onABCClick.js

addEventListenrereresr(afafafsf,eafa)

[Lotto]
- model.js  (get, set data 관련 코드, 구매금액, 횟수, 로또번호. getMoney, setMoney)
  : set메서드를 써서하는거는 this.value = value 와 다를게없다... 
  : 고도화. move. addLotto([]), setLotto([[], [], [], [], []])
- controller.js  (this.model, this.view = new View(). manageLottoClick() {}, handler관련코드.)
  : 버튼handler => "click", this.managePocket().  managePocket() { lottonumbers = generateRandim, this.model.lottonumber,  this.view.showPocketSection(lottonumbers)}
- view.js (querySelector, innerHTML, render, reset DOM 관련. 다여기.)




- util.js generaterandomnumber, $, $$ = document.querySelectoAll("selector")

- constants 폴더
  - constant.js cosnt LOTTO = {MIN_VALUE, MAX_VALUE}
  - message.js ERRORMESSAGe....

- layout 폴더
  - template.js 
  - message.js 


*/
