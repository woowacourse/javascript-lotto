## step1

<details>
  <summary>step1 요약</summary>

- [x] 로또 구입 금액을 입력한다. -> ui
  - [x] 구입 금액 입력 받기 -> ui
  - [x] 예외 처리 -> domain
    - [x] 1,000원으로 나누어 떨어지지 않는 경우
    - [x] 숫자가 아닌 경우
    - [x] 1,000원보다 작은 경우
    - [x] 구입 금액이 20,000을 초과할 경우
- [x] 구입 금액에 해당하는 만큼 로또를 발행해야 한다. -> domain
  - [x] 1 - 45 사이의랜덤 숫자를 생성한다.
- [x] 로또 번호를 오름차순으로 정렬한다. -> domain
  - [x] 정렬된 로또번호를 보여준다. -> ui
- [x] 당첨 번호를 입력받는다. -> ui
  - 예외 처리 -> domain
    - [x] 숫자가 아닐 경우
    - [x] 1 미만 45 초과일 경우
    - [x] 번호가 중복되는 경우
- [x] 보너스 번호를 입력받는다. -> ui
  - [x] 예외 처리 -> domain
    - [x] 숫자가 아닐 경우
    - [x] 1 미만 45 초과일 경우
    - [x] 당첨 번호와 중복되는 경우
- [x] 사용자가 구매한 로또 번호와 당첨 번호를 비교한다. -> domain
  - [x] 사용자의 로또와 당첨 번호가 몇 개 동일한지 비교한다.
  - [x] 사용자의 로또에 보너스 번호가 존재하는지 확인한다.
  - [x] 5개 번호 + 보너스 번호가 일치하는지 확인한다.
  - [x] 당첨 내역을 계산한다.
- [x] 당첨 내역 출력한다. -> ui
  - [x] 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다. -> ui
        1등: 6개 번호 일치 / 2,000,000,000원
        2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
        3등: 5개 번호 일치 / 1,500,000원
        4등: 4개 번호 일치 / 50,000원
        5등: 3개 번호 일치 / 5,000원
- [x] 수익률을 출력한다. -> ui
  - [x] 수익률을 계산한다. -> domain
- [x] 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다. -> ui
  - [x] 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다. -> domain
- [x] 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시킨다. -> domain
- [x] 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다. -> ui

## pr 피드백

- [x] randomNumber 함수로 분리
- [x] for문을 사용한 명령형 프로그래밍을 쓰기보다 map,reduce와 같은 선언형 프로그래밍 형식으로 작성하기
- [x] Lotto class에게 역할을 부여해주기.
- [x] UserLotto에서 #price 인스턴스 제거
- [x] UserLotto 클래스 명 변경 또는 함수로 변경
  - LottoManager 클래스로 변경 및 static 함수로 사용
- [x] countMatchingNumbers 함수 로직 분리
- [x] filter를 사용해서 일치하는 로또 번호 갯수 구하기
- [x] 일치 개수 + 보너스 일치 여부만 판단
- [x] 일치 판단기준 변환
- [x] error 변수 상수화

</details>

## step2

<details>
  <summary>step2 1차 요약</summary>

**요구사항**

- [x] package.json > "homepage" 값에 본인의 GitHub username 입력
- [x] npm run deploy 스크립트를 실행해서 배포
  - https://mun-kyeong.github.io/javascript-lotto/index.html 링크로 배포 완료
- [ ] 목적에 맞는 HTML 태그를 사용
- [ ] CSS 속성 선언 순서의 일관성을 고려
- [ ] CSS 속성은 가능하면 축약형(shorthand)을 사용
- [ ] flexbox를 활용해 레이아웃을 구성

**진행계획**

- [x] figma를 통해 css 기본 속성 정의
- 로또 구매 화면 제작

  - # main contents
  - [x] html 뼈대 구성
  - [x] card title 제작 (css)
  - [x] card input 입력창 제작 (css)
    - # card input 기능 구현
    - [x] 입력창을 통해 로또 생성 (feat)
      - [x] 올바르지 않은 입력의 경우 에러 표시 필요
  - [x] 로또 출력 화면 제작 (css)
    - # 로또 출력 화면 기능 구현
    - [x] 로또 개수 화면에 출력
    - [x] 생성된 로또를 화면에 출력
  - [x] 당첨번호 및 보너스 번호 입력 창 제작 (css)
    - # 당첨번호 및 보너스 번호 기능 구현
    - [x] 당첨번호 및 보너스 번호 가져오기
  - [x] 결과 확인 버튼 제작 (css)
  - # layout
  - [x] header 제작
  - [x] footer 제작

- 당첨 통계 모달 화면 제작
  - [x] 당첨 통계 html 뼈대 제작
  - [x] 통계 title 제작 (css)
  - [x] 일치 결과 테이블 제작 (css)
  - [x] 수익률 출력 화면 제작 (css)
  - [x] restart 버튼 제작 (css)
    - [x] restart 기능 제작

<details>

**2차 PR반영**

- [ ] modain/web 디렉터리에 대해서는 코멘트 확인
- **layout 수정**
- [x] className 명시적으로 변경하기
- [x] restart-button 클래스명으로 변경
- [x] !important 속성 삭제 & 선택자 특이도 높이기
- [x] position - inset 속성으로 변경
- [x] padding으로 통일
- [x] title Document 삭제
- [x] reset()에서 사용할 숨김 class 만들기

- **feat**
- [x] form 태그 사용하기 + reset 옵션 적용
- [x] 화면 렌더링 시 필요한 input에 자동 focus 처리
- [x] querySelector에서 jQuery사용으로 변경
- [x] domain과 ui 역할 분리 - setup.js / modal.js
- [x] 결과 확인 후 winnerLotto disable 처리해주기

- [ ] commit 링크 연동
