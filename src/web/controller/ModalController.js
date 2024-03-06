import { modal } from "../utility/modal.js";

/* NOTE
  모달 내용을 받아서 출력해주는 클래스
  기본 요소: 배경, 본문 배경, 닫기 버튼 
*/

class ModalController {
  #modalContent = null;
  #modalHandlers = {};

  constructor(modalContent, modalHandlers) {
    /* NOTE
      modalHandlers : {'선택자' : 이벤트 핸들러 함수}로 이루어진 객체
    */

    this.#modalContent = modalContent;
    this.#modalHandlers = modalHandlers;
  }

  createModal() {
    const modalBackgroundSec = modal.createModalBackgroundSection(
      this.#modalContent
    );

    document.querySelector("main").appendChild(modalBackgroundSec);

    this.#setupModalHandlers();
  }

  #setupDefaultHandlers() {
    // NOTE: 모달 닫기 버튼, 모달 외곽 배경 클릭시 닫기 - 모든 모달에 공통으로 세팅
    const closeModal = () => {
      document.querySelector(".modal-section").remove();
    };

    this.#addEventToModalButton(".modal-close-btn", closeModal);
    this.#addEventToModalButton(".modal-section", closeModal);
  }

  #setupModalHandlers() {
    this.#setupDefaultHandlers();

    Object.entries(this.#modalHandlers).forEach(([selector, handlerFunc]) => {
      this.#addEventToModalButton(selector, handlerFunc());
    });
  }

  #addEventToModalButton(selector, handlerFunc) {
    const button = document.querySelector(selector);

    if (button) {
      button.addEventListener("click", handlerFunc);
    }
  }
}

export default ModalController;
