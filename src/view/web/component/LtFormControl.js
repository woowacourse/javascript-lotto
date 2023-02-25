import LtComponent from './LtComponent';

/**
 * Form Control 역할을 수행하는 Custom Element
 */
class LtFormControl extends LtComponent {
  /** @type {ElementInternals} */
  #internals = this.attachInternals();

  constructor() {
    super();

    // Form associated custom element에서 implicit submission 기능은
    // 아직 구현되지 않았기 때문에, Enter 키 입력을 직접 감지하여
    // 수동(`form.requestSubmit()`) 으로 폼을 제출해주어야 함
    // Link: https://github.com/WICG/webcomponents/issues/815
    this.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const { form } = this.#internals;

        if (form !== null) form.requestSubmit();
      }
    });
  }

  static get formAssociated() {
    return true;
  }

  /**
   * Form Associated Element 에서 사용되는
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals ElementInternals} 를 반환
   *
   * @returns {ElementInternals}
   */
  getInternals() {
    return this.#internals;
  }

  /**
   * Form Control 의 값을 validation한 결과를 설정하는 함수
   *
   * 만약 오류를 표시하고 싶다면 아래와 같이 사용
   * @example
   * this.setValidation(false, '입력값이 숫자가 아닙니다!');
   *
   * 메세지를 표시하지 않고 invalid 상태로 만드려면 message 인자를 생략한다.
   * (required 같은 경우)
   * @example
   * this.setValidation(false);
   *
   * 오류를 제거하고 싶을 시 아래와 같이 null 값을 준다.
   * @example
   * this.setValidation(true);
   *
   * @param {boolean} valid
   * @param {string} message
   */
  setValidation(valid, message) {
    this.#internals.setValidity({ customError: !valid }, message || ' ');
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get form() {
    return this.#internals.form;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get name() {
    return this.getAttribute('name');
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get type() {
    return this.localName;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get validity() {
    return this.#internals.validity;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get validationMessage() {
    return this.#internals.validationMessage;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  get willValidate() {
    return this.#internals.willValidate;
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  checkValidity() {
    return this.#internals.checkValidity();
  }

  /**
   * Form Associated Element 에서 기본적으로 제공되어야 할 프로퍼티
   */
  reportValidity() {
    return this.#internals.reportValidity();
  }
}

export default LtFormControl;
