### 안내 사항
* type: module 설정을 삭제했습니다. 이에 따라 step1-index.js 실행 방식이 변경되었습니다.
  * ```node -r npm step1-index.js```로 실행하시면 됩니다.
* 메시지 상수는 길이가 길지 않다면 분리하지 않고 하드코딩했습니다.  
  이유
  * 재사용되지 않는 메시지를 분리하는 것은 작성할 때, 읽을 때 번거로움을 더합니다.
  * 하드코딩된 메시지가 주석의 역할을 하는 장점이 있습니다.

### step 1 결과물 보완
- [x] package.json "type: module" 삭제
- [x] "상태"가 아닌 정적 멤버변수를 전역 상수로 관리
- [x] 메시지 상수 하드코딩 방식으로 변경

### step 2 구현 사항
- [x] css, html을 이용해 하나의 html 페이지에 화면 만들기  
- [ ] Observer, Observable, Component 추상 클래스 생성
- [ ] 구입 금액 입력 
  - [ ] buyAmountForm 컴포넌트 생성
  - [ ] buyAmountState 생성 및 연결
- [ ] 생성 로또 표시
  - [ ] boughtLottoBoard 컴포넌트 생성
  - [ ] lottosState 생성 및 연결
- [ ] 당첨 결과 표시
  - [ ] WinningLottoForm 컴포넌트 생성
  - [ ] LottoResultState 생성 및 연결
    - [ ] isResultModalOn
    - [ ] ranks
    - [ ] profitRate
    - [ ] LottoResultBoard 컴포넌트 생성