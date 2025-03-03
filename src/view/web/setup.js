import { WebApp } from "../../WebApp";
import { handleModal } from "./modal";

const hideLayout = (layout) => {
  $(layout).addClass("hide-layout").removeClass("show-layout reset-layout");
};

const showLayout = (layout) => {
  $(layout).removeClass("hide-layout reset-layout").addClass("show-layout");
};

const resetLayout = (layout) => {
  $(layout).addClass("reset-layout").removeClass("hide-layout show-layout");
};

const resetLotto = () => {
  // 모달 off
  const $prizeResultModal = $("modal");
  resetLayout($prizeResultModal);

  // form 태그 안의 input 초기화
  $("form").each((_, form) => {
    $(form).get(0).reset();
  });

  // 사용자의 lotto 결과 초기화
  $(".lotto-contents").html("");

  // "결과 확인하기" 버튼 클릭 비활성화
  $(".result-contents").off("click", handleModal);

  // result table 결과 초기화
  const $resultTable = $(".result-table");
  const $tableBody = $("<tbody>").addClass("body");
  $resultTable.empty().append($tableBody);

  // result text 결과 초기화
  const $resultText = $(".prize-contents p");
  if ($resultText.eq(1).length) {
    $resultText.eq(1).remove();
  }

  // lotto 입력창 숨감
  const $winningLottoContents = $(".winningLotto-contents");
  resetLayout($winningLottoContents);

  // 제출 버튼 숨김
  const $resultContents = $(".result-contents");
  resetLayout($resultContents);

  // input,button filed disabled 처리 풀기
  $("input").prop("disabled", false).removeClass("disable-input");
  $("button").prop("disabled", false).removeClass("disable-button");

  // body 스크롤 활성화
  $("body").css("overflow", "auto");
};

const focusInput = (className) => {
  setTimeout(() => {
    $(className).first().focus();
  }, 300);
};

const disableInputPrice = () => {
  $(".input-contents input").prop("disabled", true).addClass("disable-input ");
  $(".input-contents button").prop("disabled", true).addClass("disable-button");
};

export { resetLotto, disableInputPrice, focusInput, hideLayout, showLayout };
