## 기능 요구 사항

- [x] 로또 구입 금액을 입력받는다.

  - [x] 구입 금액이 정수인지 체크한다.
  - [x] 구입 금액이 1,000원 단위인지 체크한다.
  - [x] 구입 금액이 최소 구입 금액(1000원)을 넘는지 체크한다.
  - [x] 구입 금액이 최대 구입 금액(10만원)을 넘지 않는지 체크한다.
  - [x] 잘못된 입력이 발생한 경우 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

- [x] 로또를 발행한다.

  - [x] 로또 숫자에는 중복이 포함될 수 없다.
  - [x] 로또 숫자가 정수만 가능하다.
  - [x] 1 ~ 45까지의 숫자만 허용된다.
  - [x] 로또 숫자는 6개여야 한다.
  - [x] 오름차순으로 정렬한다.

- [x] 구입 금액에 해당하는 만큼 로또를 출력한다.

  - [x] 발행한 로또 개수를 출력한다.
  - [x] 발행받은 로또 숫자들을 출력한다.

- [x] 당첨 번호를 입력받는다.

  - [x] 쉼표(,)를 기준으로 나눈다.
  - [x] 로또 숫자에는 중복이 포함될 수 없다.
  - [x] 로또 숫자가 정수만 가능하다.
  - [x] 1 ~ 45까지의 숫자만 허용된다.
  - [x] 로또 숫자는 6개여야 한다.
  - [x] 잘못된 입력이 발생한 경우 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

- [x] 보너스 번호를 입력받는다.

  - [x] 로또 숫자가 정수만 가능하다.
  - [x] 1 ~ 45까지의 숫자만 허용된다.
  - [x] 당첨 번호와 중복되면 안된다.
  - [x] 잘못된 입력이 발생한 경우 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

- [x] 구매한 로또 번호와 당첨 번호를 비교한다.

  - [x] 일치한 결과 값을 반환한다.

- [x] 비교한 결과 값으로 수익률을 구한다.

- [x] 당첨 통계를 출력한다.

  - [x] 일치한 개수를 출력한다.
  - [x] 수익률을 출력한다.

- [x] 재시작 여부를 입력받는다.
  - [x] y, n의 입력만 가능하다.
  - [x] 잘못된 입력이 발생한 경우 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

---

## 폴더 구조

```js
📦src
 ┣ 📂constants // 상수(도메인, 입출력 메세지)
 ┃ ┣ 📜lotto.js
 ┃ ┗ 📜message.js
 ┣ 📂lotto // 도메인 관련 로직
 ┃ ┣ 📜calculatePrizeResult.js
 ┃ ┣ 📜calculatePrizeResult.test.js
 ┃ ┣ 📜formatLottoNumbers.js
 ┃ ┣ 📜formatLottoNumbers.test.js
 ┃ ┣ 📜generateLottoNumberSets.js
 ┃ ┣ 📜generateLottoNumberSets.test.js
 ┃ ┣ 📜generateLottoNumbers.js
 ┃ ┣ 📜generateLottoNumbers.test.js
 ┃ ┣ 📜getTotalPrizeMoney.js
 ┃ ┗ 📜getTotalPrizeMoney.test.js
 ┣ 📂utils // 범용적인 유틸 함수
 ┃ ┣ 📜array.js
 ┃ ┣ 📜array.test.js
 ┃ ┣ 📜input.js
 ┃ ┣ 📜math.js
 ┃ ┣ 📜math.test.js
 ┃ ┣ 📜predicate.js
 ┃ ┗ 📜predicate.test.js
 ┣ 📂validation // 유효성 검사 로직
 ┃ ┣ 📜index.js
 ┃ ┣ 📜validationBonusNumber.js
 ┃ ┣ 📜validationBonusNumber.test.js
 ┃ ┣ 📜validationLottoPrice.js
 ┃ ┣ 📜validationLottoPrice.test.js
 ┃ ┣ 📜validationRestartInput.js
 ┃ ┣ 📜validationRestartInput.test.js
 ┃ ┣ 📜validationWinningNumbers.js
 ┃ ┗ 📜validationWinningNumbers.test.js
 ┣ 📂view // 입출력 관련
 ┃ ┣ 📂input
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜readBonusNumberInput.js
 ┃ ┃ ┣ 📜readLottoPriceInput.js
 ┃ ┃ ┣ 📜readRestartInput.js
 ┃ ┃ ┗ 📜readWinningNumbersInput.js
 ┃ ┗ 📂output
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜printLottoNumbers.js
 ┃ ┃ ┗ 📜printLottoResult.js
 ┣ 📜CustomError.js
 ┣ 📜FrozenMap.js
 ┣ 📜step1-index.js
```

## 💬 의도 설명해보기

### 한 함수당 한 파일에 넣은 이유

- 함수 이름으로 파일을 찾기 쉽다.
- 직관적이다.
- 파일이 많아지는 단점이 있지만 도메인 로직은 변경되기 쉽다고 생각하는데 변경되면 찾아서 유지보수 하기 쉽고 제거 되면 로직이랑 테스트 파일을 제거하기 유용하다.
- 각 함수가 독립적이라고 생각한다.

> 🤔 유틸 함수들은 한 함수당 한 파일에 넣지 않은 이유
>
> - 유틸 함수는 범용적으로 만들어서 변경되지 않을 가능성이 크다.(한번 잘 만들어놓으면 안건드릴지도..?)
> - 파일명으로 관심사를 분리하는 정도로 충분할 것 같다.

### FrozenMap을 사용한 이유

- 일반 객체는 키의 이름 순으로 자동 정렬이 되는데 저희 도메인 상 순서를 지켜줘야 추후에 출력하기 좋아서 Map 객체를 사용하여 순서를 보장하였습니다.

- 1depth의 상수 객체는 `Object.freeze`를 사용해서 불변성을 지키고 있는데 Map 객체는 동결시키는 기능이 없는 것 같아서 직접 확장해서 `set`, `clear` 등의 메서드를 사용할 수 없게 했습니다.

### 함수형으로 한 이유

- 함수형이 테스트 코드 짜기 좋다.(결합도가 낮은 느낌?)
- 순수 함수와 불변성을 지키려고 하는 패러다임이 좋았다(예측 가능한 코드?)

## 🤔 페어와 나눈 고민사항들

### TDD 정말 필요할까?

장점: 리팩토링할 때 테스트깨지는 걸 확인할 수 있어서 좋았다.
단점: 근데 TDD를 할 정도의 이점은 아닌 것 같다.

➔ 현업에서도 TDD를 자주 사용하시나요?
