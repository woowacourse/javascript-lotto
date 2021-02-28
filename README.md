<p align="middle" >
  <img width="200px;" src="./src/images/lotto_ball.png"/>
</p>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>
<p align="middle">
<img src="https://img.shields.io/badge/version-1.0.0-blue?style=flat-square" alt="template version"/>
<img src="https://img.shields.io/badge/language-html-red.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/language-css-blue.svg?style=flat-square"/>
<img src="https://img.shields.io/badge/language-js-yellow.svg?style=flat-square"/>
<a href="https://github.com/daybrush/moveable/blob/master/LICENSE" target="_blank">
  <img src="https://img.shields.io/github/license/daybrush/moveable.svg?style=flat-square&label=license&color=08CE5D"/>
  </a>
</p>

## 🔥 Projects!

<p align="middle">
  <img width="400" src="./src/images/lotto_ui.png">
</p>

### 🎯 step3 기능 구현 목록

- [ ] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
- [ ] 수동 구매를 위한 input UI는 스스로 구현한다.
- [ ] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [ ] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

<br>

### 🧩 step3 테스트 구현 목록
- [x] 구입 금액을 입력하고 확인 버튼을 누르면 수동 구매 영역이 보여진다
- [x] 구입 금액을 입력하고 확인 버튼을 누르면 구매가능한 로또 개수가 보여진다
- [x] 금액을 입력하고 확인 버튼, 나머지 자동구매 버튼을 클릭하면 수동 구매 영역 감춰지고 구매 내역 영역과 당첨 번호 확인 영역이 보여진다
- [x] 수동 번호를 입력하고 수동 구매 버튼을 누르면 현재 구매가능 개수가 한개 줄어든다
- [x] 수동 번호를 입력하고 수동 구매 버튼을 누르면 입력한 번호가 구매한 수동 번호 목록에 보여진다
- [x] 수동 번호 입력후 나머지 자동 구매 버튼을 누르면 입력한 수동 번호가 포함된 로또 번호가 보여진다
- [x] 구매 가능한 개수가 1개인 상태에서 수동 구매를 하면 구매 내용, 당첨 영역이 보여지고, 수동 구매 영역은 감춰진다.
- [x] 수동 번호를 전부 입력하지 않은 상태로 결과 확인하기 버튼을 누르면 alert가 발생해야 한다.
- [x] 수동 번호에 중복되는 숫자가 있으면 alert가 발생해야 한다.
- [x] 수동 번호가 1이상 45이하가 아닌 숫자가 있을때 alert가 발생해야 한다.
- [x] 수동 번호에 소수가 있으면 alert가 발생해야 한다.

- [x] 앞서 구현한 테스트중 구입금액 입력, 확인 버튼 누르기 후 '나머지 자동 구매' 버튼을 누르는 과정을 추가해야한다 
<br>

##### 🧩 step2 테스트 구현 목록

- [x] 결과 확인하기 버튼을 누르면 모달 창이 보여진다.
- [x] 당첨된 로또의 총 개수는 구매한 로또의 총 개수보다 작거나 같아야 한다.
- [x] 수익률은 -100보다 작을 수 없다.
- [x] 다시 시작하기 버튼을 누르면 제목과 구입 금액 영역만 보여진다.
- [x] 구매한 번호와 당첨 번호가 6개 일치할 때 당첨 개수와 수익률이 기대한 대로 출력된다.
- [x] 당첨 번호를 전부 입력하지 않은 상태로 결과 확인하기 버튼을 누르면 alert가 발생해야 한다.
- [x] 당첨 번호에 중복되는 숫자가 있으면 alert가 발생해야 한다.
- [x] 당첨 번호가 1이상 45이하가 아닌 숫자가 있을때 alert가 발생해야 한다.
- [x] 당첨 번호에 소수가 있으면 alert가 발생해야 한다.


##### 🧩 step1 테스트 구현 목록

- [x] 사이트 접속시에 제목과 구입 금액 영역만 보여진다.
- [x] 금액을 입력하고 버튼을 클릭하면 구매 내역 영역과 당첨 번호 확인 영역이 보여진다.
- [x] 금액을 입력하고 버튼을 클릭하면 입력 금액/1000 개의 로또 이모지가 보여진다.
- [x] 번호보기 토글 버튼을 클릭하면 각 로또 이모지와 로또 번호 6자리가 보여진다.
- [x] 번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 서로 달라야 한다.
- [x] 번호보기 토클 버튼을 클릭했을 때 나오는 각 로또 번호들은 1이상 45이하 사이여야 한다.
- [x] 금액에 소수점을 입력했을때 alert가 발생해야 한다.
- [x] 금액에 음수를 입력했을때 alert가 발생해야 한다.
- [x] 금액에 1000원 미만을 입력했을때 alert가 발생해야 한다.

<br>

### 🔨 커밋 메세지 컨벤션

- 기능(feat): 새로운 기능을 추가
- 버그(fix): 버그 수정
- 리팩토링(refactor): 코드 리팩토링
- 형식(style): 코드 형식, 정렬, 주석 등의 변경(동작에 영향을 주는 코드 변경 없음)
- 테스트(test): 테스트 추가, 테스트 리팩토링(제품 코드 수정 없음, 테스트 코드에 관련된 모든 변경에 해당)
- 문서(docs): 문서 수정(제품 코드 수정 없음)
- 기타(chore): 빌드 업무 수정, 패키지 매니저 설정 등 위에 해당되지 않는 모든 변경(제품 코드 수정 없음)

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.
