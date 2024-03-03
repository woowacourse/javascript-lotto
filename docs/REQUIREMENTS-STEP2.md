### 안내 사항
* type: module 설정을 삭제했습니다. 이에 따라 step1-index.js 실행 방식이 변경되었습니다.
  * ```node -r npm step1-index.js```로 실행하시면 됩니다.
* 메시지 상수는 길이가 길지 않다면 분리하지 않고 하드코딩했습니다.  
  **이유**
  * 재사용되지 않는 메시지를 분리하는 것은 작성할 때, 읽을 때 번거로움을 더합니다.
  * 하드코딩된 메시지가 주석의 역할을 하는 장점이 있습니다.

### step 1 결과물 보완
- [x] package.json "type: module" 삭제
- [x] "상태"가 아닌 정적 멤버변수를 전역 상수로 관리
- [x] 메시지 상수 하드코딩 방식으로 변경

### step 2 구현 사항
- [x] css, html을 이용해 하나의 html 페이지에 화면 만들기  
- [x] Observer, Observable, Component 추상 클래스 생성
- [x] 진입점이 되는 LottoWebApp 클래스 생성
- [x] 구입 금액 입력 
  - [x] buyAmountForm 컴포넌트 생성
- [x] 생성 로또 표시
  - [x] lottosState 생성 및 연결
  - [x] boughtLottoBoard 컴포넌트 생성
- [x] 당첨 결과 표시
  - [x] WinningLottoForm 컴포넌트 생성
  - [x] LottoResultState 생성 및 연결
    - [x] isResultModalOn
    - [x] ranks
    - [x] profitRate
    - [x] LottoResultModal 컴포넌트 생성
    - [x] 다시 시작하기 구현

## 추가 기능 구현
- [x] 유효성 검증 후 에러 발생 시 화면에 문구 표시
- [x] 로또 내부 스크롤 만들기 (화면 너무 길어지지 않게)
- [x] header, footer 렌더도 처음에 한번에 (html에 있는 거 분리해서 빼내기)
- [x] 반응형 신경쓰기 (naver 처럼 minLength 정하기 + 요소 깨지는 거 수정)
- [x] form으로 처리하여 enter 적용되게
- [x] 모달 esc로 close되도록

## 리팩토링
- [x] result modal 표 생성 코드 개선
- [x] state 클래스 추상화
- [x] css 컴포넌트 별로 나누기
- [x] css 이름 일관성 맞추기
- [x] js 셀렉팅은 id로, css 셀렉팅은 class 하기
- [ ] 컴포넌트에서 service 로직 분리하기
- [ ] 구조 그려서 설명(옵저버 패턴에 대해 + (구체적으로) state와 component와의 관계도)