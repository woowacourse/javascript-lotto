<h1 align="middle">🎱</h1>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>

## 실행 방법
```bash
git clone -b step2 --single-branch https://github.com/rbgksqkr/javascript-lotto.git
cd javascript-lotto
npm i
npm run start-step2
```

## 기능 요구 사항

### UI
- [x] header
- [x] footer
- [x] 전체 레이아웃 구성
  - [x] 로또 구입 전 레이아웃 구성
  - [x] 로또 구입 후 레이아웃 구성
- [x] 로또 구입 금액, 당첨번호, 보너스 번호 input
- [x] 당첨 통계 모달

### 웹 기반 로또 게임
- [x] 로또 구입 금액 input으로 입력받기
  - [x] readLine 모듈을 활용해 입력받던 사용자 입력값을 브라우저 DOM API로 가져오기
  - [x] 구매 금액 유효성 검사 예외 발생 시 에러 메시지 화면에 출력
- [x] 구입 버튼 클릭 시 사용자가 구매한 로또 번호 목록을 화면에 출력
  - [x] console.log 대신 DOM API로 element를 추가하여 화면에 출력
  - [x] 구입 버튼을 클릭하고 유효성 검사를 통과하면 당첨번호와 보너스 번호를 입력할 수 있는 입력 화면 렌더링
- [x] 당첨번호 6개와 보너스 번호 1개를 input으로 입력받기
  - [x] 로또 번호 유효성 검사 예외 발생 시 에러 메시지 화면에 출력
- [x] 결과 확인 버튼 클릭 시 당첨 통계 모달에 출력
  - [x] 클릭 이벤트가 발생할 때 input에 입력된 당첨번호와 보너스 번호로 로또 결과와 수익률 계산
  - [x] 당첨 통계와 수익률을 화면에 출력
  - [x] 닫기 버튼 클릭 시 모달 닫기
  - [x] 모달 닫았다가 다시 열어도 통계 그대로 출력하기
  - [x] 다시 시작하기 버튼 클릭 시 처음 로또 구입 금액 단계로 이동 (초기화)
  - [x] 모달 바깥 부분 클릭 시 모달 닫기