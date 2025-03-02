import { hideLayout, showLayout } from "./setup";

const allowModalOpen = () => {
  const $prizeResultModal = $("modal");
  showLayout($prizeResultModal);

  const $prizeResultButton = $(".result-contents");
  const $closeButton = $("modal .close-button");

  $prizeResultButton.on("click", handleModal);
  $closeButton.on("click", handleModal);
  $("body").css("overflow", "hidden");
};

const handleModal = () => {
  const $prizeResultModal = $("modal"); // jQuery 선택자 사용
  const modalOpenStatus = $prizeResultModal.css("visibility");

  if (modalOpenStatus === "hidden") {
    showLayout($prizeResultModal);
    $("body").css("overflow", "hidden");
  } else if (modalOpenStatus === "visible") {
    hideLayout($prizeResultModal);
    $("body").css("overflow", "auto");
  }
};

const allowWinningLotto = () => {
  const $winningLottoContainer = $(".winningLotto-contents");
  const $resultSubmitButton = $(".result-contents");

  showLayout($winningLottoContainer);
  showLayout($resultSubmitButton);
};

export { handleModal, allowModalOpen, allowWinningLotto };
