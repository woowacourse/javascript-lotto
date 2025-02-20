## 학습 목표

UI와 도메인 영역을 분리할 수 있는 설계를 고민해보고, 목적에 맞게 객체와 함수를 활용
단위 테스트 기반으로 점진적인 리팩터링

## 기능 요구사항

- 로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.
  - 로또 구입 금액 입력 - UI
  - 구입 금액에 해당하는 만큼 로또 발행 - Domain
- 로또 번호는 오름차순으로 정렬하여 보여준다
  - 로또 번호를 오름차순으로 정렬한다 - Domain
  - 정렬된 로또 번호를 보여준다 - UI
- 로또 1장의 가격은 1,000원이다 - Domain
- 당첨 번호와 보너스 번호를 입력받는다 - UI
- 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.
  - 사용자가 구매한 로또 번호와 당첨 번호를 비교한다 - Domain
  - 당첨 내역 및 수익률을 출력한다. - UI
- 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다. - UI
- 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.
  - 게임을 재시작 한다. - Domain
  - 게임을 종료한다. - Domain
  - 재시작 여부를 입력한다 - UI
- 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

  - 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시킨다. - Domain
  - 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다. - UI

### Domain

- [x] 로또 1장의 가격은 1,000원이다 - Domain
- [x] 구입 금액에 해당하는 만큼 로또 발행 - Domain
  - [x] 구입 금액에 맞는 갯수 만큼 로또가 발행된다 - Domain
- [x] 사용자가 구매한 로또 번호와 당첨 번호를 비교한다 - Domain
- [x] 게임을 재시작 한다. - Domain
- [x] 게임을 종료한다. - Domain
- [x] 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시킨다. - Domain
- [x] 로또 번호는 1~45까지 이다.(랜덤 번호를 추출하는 함수) - Domain

Lotto

- [x] 로또 번호는 6자리이다. - Domain
- [x] 로또 번호를 오름차순으로 정렬한다 - Domain

- LottoPack (사용자 로또 용지)

- [x] 난수(랜덤 번호 6개)세트를 받아서 Lotto를 생성 및 관리한다. - Domain

- LottoMachine

  - [x] count 값 만큼 난수 세트 생성 - Domain
    - [x] 1~45 중 6개의 랜덤 값을 생성 - Domain
      - [x] 랜덤 값은 중복될 수 없다. - Domain
  - [x] Lotto Instance 생성 및 반환한다. - Domain

- AnswerLottoPack

  - [x] 당첨번호와 보너스 번호를 관리한다(해시테이블) - Domain

- CompareMachine

  - [x] 사용자가 구매한 로또 번호와 당첨 번호를 비교한다.
    - [x] 로또 번호와 같은 당첨 번호 갯수를 센다.

- ProfitCalculator
  - [x] 구매한 금액과 당첨 결과를 넣으면 수익률이 나온다.
    - [x] 당첨 결과와 당첨액을 매치하여 수익금을 구한다.
    - [x] 구매한 금액과 수익금을 계산해서 수익률을 구한다.

### 유효성 검증 도메인

- 구입금액 관련 도메인 검증

  - [x] 숫자 값만 들어와야한다.
  - [x] 1,000원 단위로 들어와야한다.

- 당첨번호 관련 도메인 검증

  - [x] 구분자로 , 를 사용해야한다.
  - [x] 숫자 값이 들어와야한다.
  - [x] 6개의 값이 들어와야한다.
  - [x] 1~45 사이의 값이 들어와야한다.
  - [x] 중복된 숫자 값이 있으면 안된다.

- 보너스번호 관련 도메인 검증
  - [x] 숫자 값이 들어와야한다.
  - [x] 당첨번호와 중복이 되면 안된다.
  - [x] 1~45 사이의 값이 들어와야한다.

### UI

- [x] 로또 구입 금액 입력 - UI
- [x] 정렬된 로또 번호를 보여준다 - UI
- [x] 당첨 번호와 보너스 번호를 입력받는다 - UI
- [x] 당첨 내역 및 수익률을 출력한다. - UI
- [x] 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다. - UI
- [x] 재시작 여부를 입력한다 - UI
- [x] 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다. - UI

### UI 기능

- [x] 입력 및 출력 메서드 Console객체 관리 - UI
- [x] retryCheck(입력 재반복) 메서드 구현 - 도메인+UI

### UI(input)와 도메인 연결 -> controller

- [x] 구입금액 입력 + 구입금액 검증
- [x] 당첨 번호 입력 + 당첨 번호 검증
- [x] 보너스 번호 입력 + 보너스 번호 검증
- [x] 게임 재시작 여부 입력 + 재시작 입력 검증

### UI(output)와 도메인 연결 -> controller

- [x] 구매 개수 출력
- [x] 로또 번호 세트 출력
- [x] 당첨 통계 출력
- [x] 수익률 출력

### 참고

- 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.

1등: 6개 번호 일치 / 2,000,000,000원
2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
3등: 5개 번호 일치 / 1,500,000원
4등: 4개 번호 일치 / 50,000원
5등: 3개 번호 일치 / 5,000원

### 리팩토링 사항

- [ ] purchaseLottoCount -> LottoMachine 내부로 이동
- [ ] answerLottoPack -> 함수로 변경 (return 값으로 정답 테이블 (해시테이블))
- [x] lotto 객체 내부에서 값을 체크 할 수 있게 변경 -> lotto 객체 내부로 정답 테이블로 넘겨준다. (객체 지향)
- [x] lottoPack 객체 스스로 저장할 수 있게 변경
- [x] compareMachine 함수 제거
- [x] InputMessage 상수화
- [x] OutputMessage 상수화
- [x] 공통 값 상수화
- [x] depth 1 규칙 활성화
  - [x] createSixRandomNumber 로직 변경
  - [x] retryCheckInput 로직 변경
- [x] 6개 랜덤 넘버 생성 함수 분리
- [ ] if문 condition 함수 분리
