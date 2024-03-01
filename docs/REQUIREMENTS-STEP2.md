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
- [ ] 유효성 검증 후 에러 발생 시 화면에 문구 표시
- [ ] 인풋 최대 길이 설정(js로 처리)
- [ ] 로또 번호 두 글자 입력시 다음 칸으로
- [ ] 로또 내부 스크롤 만들기 (화면 너무 길어지지 않게)
- [ ] header, footer 렌더도 처음에 한번에 (html에 있는 거 분리해서 빼내기)
- [ ] 반응형 신경쓰기 (naver 처럼 minLength 정하기 + 요소 깨지는 거 수정)

## 리팩토링
- [ ] css 이름 일관성 맞추기
- [ ] 컴포넌트 분리 생각해보기 (재활용 가능하면 베스트)
- [ ] 렌더링 비용에 대한 고민 (렌더링 횟수 최소화?)
- [ ] js 셀렉팅은 id로, css 셀렉팅은 class 하기
- [ ] 컨트롤러를 분리한 후, Web 앱에서도 컨트롤러 재사용하는 방식으로 리팩토링 (시간 되면)
- [ ] result modal 표 생성 코드 개선