## 🍊 `Step2` 니야의 로또 웹 미션 구현하기 🍊

안녕하세요, 동키콩! 니야입니다. 이번 삼일절 연휴는 잘 보내고 계신가요 😃
이번 로또 미션 2단계는 웹을 구현하는 미션이었는데, 어떻게 설계해야 효율적으로 구현할 수 있을지 고민이 많이 되더라구요.
그래서 지난 기수 크루들이 구현한 로또 웹 미션을 열심히 찾아보면서 학습하여 제가 도입하고자 하는 설계 방식으로 구현해봤습니다!
아래는 코드 이해하기 쉽도록 웹 구현 내용에 대해 간단하게 시각화한 플로우 차트입니다.
<img width="866" alt="image" src="https://github.com/user-attachments/assets/88aad192-d4e4-4aa8-b32d-fb3b40455b82" />
`console`과 함께 작업한 미션이다보니 폴더 구조를 어떻게 잡으면 좋을지 더 고민했던 것 같습니다. `console` 기반으로 구현할 때는 `MVC`를 사용했는데요. 그렇기에 웹 개발에서도 동일한 `domain` 로직을 사용하려다보니 `MVC` 구조를 최대한 활용해보고 싶었습니다. 그래서 controller와 `view`를 사용했습니다. `controller`에서는 전반적인 로직 관리를 중점적으로 했고, 여기서 `domain`과 `view`를 통신해주는 역할을 했습니다. `view` 에서는 전체 구조를 담은 `View` 클래스를 하나 만들어두고, 세부 내용은 코드 볼륨도 커지고 폴더 `depth`가 깊어질 것 같아서 `components` 폴더를 새로 생성하여 독립적으로 관리해주었습니다. 이번에 `customElements`를 사용하였는데요. 그 이유는 최대한 캡슐화 하여 각각 모듈별로 응집도를 높이고 싶었기 때문입니다. 그래서 크게 총 6가지의 커스텀 컴포넌트로 분리하여 묶어서 관리해봤습니다. 여기서 `HTMLElement`를 상속받은 `BaseWebComponent` 라는 추상 클래스를 하나 생성했는데요. 각각의 컴포넌트들이 `BaseWebComponent`를 상속받아서 공통적으로 사용하는 메서드를 사용함으로써, 코드 재사용성이나 일관성을 높일 수 있도록 해주고 싶었습니다.

## 학습 목표

이번 미션을 통해 다음과 같은 학습 경험들을 쌓는 것을 목표로 합니다.

- UI와 도메인 영역을 분리할 수 있는 설계를 고민해보고, 목적에 맞게 객체와 함수를 활용
- TDD 방식으로 개발하며, 단위 테스트 기반으로 점진적인 리팩터링

## 제출 전 체크 리스트

<!-- 리뷰를 요청하기 전, 다음 항목들을 기본적으로 확인해 주세요. -->

- [x] 기능 요구 사항을 모두 구현했고, 정상적으로 동작하는지 확인했나요?
- [x] 기본적인 프로그래밍 요구 사항을 준수하고 있는지 확인했나요?
- [x] 테스트 코드는 모두 정상적으로 실행되나요?
- [x] (해당하는 경우) 배포한 데모 페이지에 정상적으로 접근할 수 있나요?
  - 배포한 링크 기입: https://sooyeoniya.github.io/javascript-lotto/

## 리뷰 요청 & 논의하고 싶은 내용

<!-- PR 작성자로서, 코드만으로는 알기 어려운 작성자의 의도와 문제 해결 과정에 대해 공유해 주세요.
이 PR에서 달성해야 하는 학습 목표를 잘 달성하고 있는지 스스로 확인하며, 피드백 받을 수 있는 내용일지 점검해 보세요.
리뷰어에게 정답을 묻기보다 고민하고 의사 결정한 과정에 대해 공유하고 이에 대한 피드백을 받으며 대화해보기를 권장합니다. -->

### 1) 이번 단계에서 가장 많이 고민했던 문제와 해결 과정에서 배운 점

<!-- 구현 과정에서 가장 어려웠던 점이나 많이 고민한 점은 무엇인가요?
이를 해결하기 위해 어떤 방법들을 검토하고 시도했으며, 그 과정에서 새롭게 배운 점이 있나요? -->

- 이번에는 어떻게 보면 `view`라고 볼 수 있는 `component`의 내부에서 `입력에 대한 유효성 검증 함수(domain)`를 직접 호출하는 방식으로 진행했습니다. `console` 기반 로또 미션 진행 당시에는 `MVC` 패턴에 대한 생각이 확고하여 최대한 각각을 독립적으로 분리하려고 노력했었습니다. 그리고 우테코에서도 `domain`과 `UI` 를 최대한 분리하라고 권장했구요. 근데 이번에 `domain`이라고 생각했던 유효성 검증 로직에 대한 생각이 많이 바뀌었습니다. 지난 수업시간에 로또 웹 개발에 대한 시퀀스 다이어그램을 그려보는 과정에서 공원한테 배운 게 있었습니다. 입력 유효성 검증 로직은 `UI`에서도 진행할 수 있더라구요. 특히 이제 웹으로 넘어오면 `UI`즉 `view`가 담당하는 부분이 더 많아질 것이라고 말씀해주셨습니다. 듣고 보니 공원의 말씀이 확실히 체감되었습니다. 실제로 입력은 이제 `UI`에서 받아서 에러가 발생하면 바로 화면에 표시해주어야하는데, 유효성 검증을 그 자리에서 바로 해주면 되지, 굳이 불필요한 경로를 만들 필요는 없다고 생각했습니다. 예를 들어, 아래 `WinningLotto` 객체에 있는 메서드는, 당첨 번호와 보너스 번호를 받아 에러 메시지를 `UI`에 직접 출력해주는 메서드입니다. 근데 이 부분을 `domain`인 `validate`메서드들과 `view`인 `hideElement`, `renderElement` 이런 부분들과 독립적으로 작성하기에는 좀 어려운 부분이 있어서 그냥 `WinningLotto` 객체 내부에서 해주는 것이 맞다고 판단했습니다. 왜냐하면 `controller`까지 갔다가 유효성 검증된 값을 받아오기에는 너무 불필요한 경로 이동이 존재하여 더 코드가 복잡해질 것 같다고 생각했기 때문입니다. 그래서 유효성 검증을 `UI` 출력 부분과 같은 곳에서 한 번에 작업해주는 것이 더 효율적이라고 생각하여 이리 구현하게 되었습니다.

```js
  #handleValidation(winningNumbersInput, bonusNumberInput, errorElement) {
    try {
      const winningNumbers = validateWinningNumbers(winningNumbersInput);
      const bonusNumber = validateBonusNumber(bonusNumberInput, winningNumbers);
      hideElement(errorElement);
      this.emit(EVENT_TYPES.result, { winningNumbers, bonusNumber });
    } catch (error) {
      errorElement.textContent = error.message;
      renderElement(errorElement);
    }
  }
```

### 2) 이번 리뷰를 통해 논의하고 싶은 부분

<!-- 구현한 코드와 학습 목표와 관련해 피드백을 받고 싶은 부분이나, 함께 논의해보고 싶은 점 -->

1️⃣ 전반적인 컴포넌트 명, 이벤트 타입 명 등에 대해서 이상한 부분이 있다면 피드백 부탁드립니다!

2️⃣ UX 측면에서 좀 불편한 부분이 있다면 피드백 부탁드립니다.

3️⃣ `View`객체의 위치가 애매합니다. `View`에는 전체 구조를 초기화해주는 곳인데, 사실상 `render` 메서드만 쓰기 때문에, `BaseWebComponent`를 굳이 상속받을 필요가 없어서 그냥 따로 독립적으로 두긴 했습니다. 하지만, `views/web/View.js` 얘만 혼자 동떨어져있는 느낌도 듭니다. `components` 폴더 내부에 함께 넣는게 맞는 걸까요? 그렇지만, `MVC` 패턴을 위해서 만든 폴더 구조가 깨지는 느낌이라 지금처럼 그냥 두고싶기도 합니다.

4️⃣ 전반적인 설계 방식과 전체 흐름에 대해서 피드백 받고 싶습니다. 예를 들어, `BaseWebComponent` 에서 상속받을 메서드가 잘못 정의되어있다든지, 메모리 누수 방지를 위해 중간에 이벤트 리스너 제거가 필요한 부분이 있다든지, 렌더링 위치가 성능 문제에 영향을 준다든지 등등 그런 부분에서 만약 피드백이 있다면 해주시면 감사하겠습니다. 그리고 특히 `사용자 정의 요소(customElements)`는 이번에 처음 접근해본 방식이어서 제대로 잘 진행된건지, 제가 혹시 놓치는 게 있는지 궁금합니다.

5️⃣ `customElements`를 상수화하는 과정에서 고민이 생겼습니다. 아래와 같이 총 6개의 컴포넌트 태그명을 상수화하였는데요.

```js
export const CUSTOM_ELEMENTS = Object.freeze({
  lottoHeader: "lotto-header",
  lottoPurchase: "lotto-purchase",
  issuedLotto: "issued-lotto",
  winningLotto: "winning-lotto",
  lottoResult: "lotto-result",
  lottoFooter: "lotto-footer",
});
```

이걸 상수화 한 이유가 `LottoController`에서 이 각 커스텀 태그들을 접근해야하다보니 하드코딩 되어있었습니다. 따라서 이렇게 하드코딩 된 부분을 없애고자 상수를 사용하자는 생각이 있었습니다. 사실 상수의 목적이 유지보수성을 높이기 위해서인데, 진짜 `유지 보수`가 참된 목적이라면 어디까지 상수화를 해야하는지 갑자기 미궁에 빠지게 되었습니다. 하나의 커스텀 컴포넌트만 살펴봐도 알 수 있습니다. 아래는 `LottoPurchase` 객체의 요소들입니다. 이것의 사용자 정의 요소 태그명은 위에서 찾을 수 있다시피 `lotto-purchase` 입니다. 그런데 내부에 `class` 선택자 이름들의 `prefix`를 모두 `lotto-purchase`로 통일해놨는데요. 이것까지도 다 상수화해줘야하는 부분일까요? 그래야만 유지보수하기 수월해질 수 있을텐데, 너무 가독성이 떨어질 것 같아서 수정하지 않았습니다.

```js
<section class="lotto-purchase">
  <h2 class="lotto-purchase__title">🎱 내 번호 당첨 확인 🎱</h2>
  <label for="purchase-amount" class="lotto-purchase__description">
    구입할 금액을 입력해주세요.
  </label>
  <form class="lotto-purchase__form">
    <input
      id="purchase-amount"
      class="lotto-purchase__input"
      placeholder="금액"
    />
    <button class="lotto-purchase__button">구입</button>
  </form>
  <p class="lotto-purchase__error ${STYLE_SELECTORS.hidden}"></p>
</section>
```

아래 부분도 마찬가지입니다. 아래는 `View` 객체의 요소들인데요. 이는 전체 커스텀 컴포넌트 구조를 정의해주는 부분입니다. 그런데 이것들까지 전부 상수화하기에는 위에서 말했던 것과 마찬가지로 가독성이 매우 떨어질 것 같아서 그냥 이대로 두었습니다.

```js
render() {
    this.app.innerHTML = `
    <lotto-header></lotto-header>
    <div class="container">
      <main>
        <lotto-purchase></lotto-purchase>
        <issued-lotto></issued-lotto>
        <winning-lotto></winning-lotto>
        <lotto-result></lotto-result>
      </main>
    </div>
    <lotto-footer></lotto-footer>
    `;
  }
```

상수화의 목적은 재사용성과 유지보수성인데, 그냥 `LottoController`에서 단순히 태그명들이 하드코딩되었다고 상수화하는 것은 옳지 않은 방식이었던 걸까요? 유지보수까지 고려하면 너무 많은 것을 상수화해야하는 것 같아서 이건 아닌 것 같다는 생각이 들었습니다. 보통 실무에서는 어떻게 상수를 활용하는지 그 기준이 궁금합니다. 제 입장이라면 동키콩은 어떤 선택을 하실지 궁금합니다!
