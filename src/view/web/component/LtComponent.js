class LtComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * 엘리먼트의 attribute 값이 변경되었을 때 호출되는 콜백 함수이다.
   *
   * @param {string} name
   * @param {any} oldValue
   * @param {any} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  /**
   * 렌더링 될 HTML 값을 반환한다.
   *
   * {@link LtComponent} 를 상속받는 컴포넌트에서 사용자가 정의한 HTML을
   * 표현하고 싶은 경우, 이 메소드를 상속하여 사용자 정의 값을 반환하면 된다.
   *
   * @example
   * class MyText extends LtComponent {
   *   getRenderContent() {
   *     return `
   *       <div>
   *         <span>${this.#myText}</span>
   *       </div>
   *     `;
   *   }
   * }
   *
   * @returns {string} HTML 문법으로 작성된 문자열 값
   */
  getRenderContent() {
    throw new Error('getRenderContent function is not implemented');
  }

  /**
   * Custom Element의 렌더링을 수행하는 함수.
   *
   * {@link getRenderContent} 로 부터 가져온 HTML string을 렌더링한다.
   *
   * ### {@link render} 함수가 수행하는 일
   * 렌더링 과정에서 처리되는 것들은 다음과 같다.
   *
   * - `observedAttributes` 로 등록되어 있는 값들을 HTML string에 주입해준다.
   *
   *   예를 들어,
   *   ```html
   *   <lt-text-input placeholder="입력해주세요" />
   *   ```
   *   위의 엘리먼트는 HTML string의 `{placeholder}` 를 `입력해주세요` 로
   *   대체하여 렌더링한다.
   *
   * - HTML string 내의 DOM 중 `id` 가 설정되어 있는 엘리먼트를 프로퍼티에 등록해준다.
   *
   *   예를 들어 HTML string이 아래와 같은 경우,
   *   ```html
   *   <span id="myInput"></span>
   *   ```
   *   위의 `span` DOM은 아래와 같이 바인딩된다.
   *   ```javascript
   *   class MyText extends LtComponent {
   *     $myInput; // HTMLSpanElement
   *   }
   *   ```
   *
   * ### DOM 이벤트 핸들링 등의 조작 시
   * {@link render} 함수가 호출될 때 마다 DOM은 새로 생성되므로,
   * DOM에 대해 이벤트를 추가하는 등의 조작을 하려면 {@link render} 함수에서 해줘야 한다.
   * ```javascript
   * class MyText extends LtComponent {
   *   render() {
   *     super.render();
   *
   *     this.$myInput.addEventListener('click', () => this.handleClick());
   *   }
   * }
   * ```
   */
  render() {
    // observedAttributes 로 등록되어 있는 attribute는 HTML에 자동으로 주입됨
    // 예: <lt-text-input placeholder="입력해주세요" /> 로 되어있는 경우,
    //     HTML 내의 '{placeholder}' 는 '입력해주세요' 로 자동으로 대체됨
    const injectAttributeFn = (content, attribute) => {
      return content.replaceAll(`{${attribute}}`, this.getAttribute(attribute) || '');
    };

    this.shadowRoot.innerHTML = (this.constructor.observedAttributes ?? []).reduce(
      injectAttributeFn,
      this.getRenderContent(),
    );

    // id 속성을 가지고 있는 HTMLElement들은 프로퍼티로 접근할 수 있도록 바인딩
    [...this.shadowRoot.querySelectorAll('[id]')].forEach(($element) => {
      this[`$${$element.id}`] = $element;
    });
  }

  connectedCallback() {
    this.render();
  }
}

export default LtComponent;
