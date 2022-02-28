## 1. 🎯기능구현 목록 정리

### 도메인

- [x] 로또 구매 금액을 입력할 수 있다.
- [x] 금액은 양수여야한다.
- [x] 금액은 정수여야한다.
- [x] 구매 금액에 맞게 로또를 구매를 할 수 있다.
- [x] 로또 번호를 중복없이 자동으로 생성한다.

### UI

- [x] html, css 작성 // TODO css style refactoring
- [x] 구매할 금액을 입력하고 구입버튼을 누르면 로또를 구매한다.
- [x] 구입 버튼을 클릭 다음 진행 상황이 render 된다.
- [x] 로또 갯수만큼 🎟️를 render
- [x] 번호 보기 토글 버튼을 클릭해 로또 번호를 볼 수 있어야 한다.

## 2. 배포

<a href="https://jhy979.github.io/javascript-lotto/">데모 페이지</a>

- [x] gh-pages를 이용하여 배포

## 3. 리팩토링

- [x] html id 및 구조 정리
- [x] 시맨틱 태그 적용
- [x] css 중복 제거
- [x] controller와 view로직 분리
- [x] 함수 네이밍
- [x] 1000원단위 input을 유연하게 변경

### 4. 도식

<img src="https://user-images.githubusercontent.com/32920566/155472798-fff2a1b0-5f87-4bdd-a514-fa5e4eace180.png" width="1000"/>
