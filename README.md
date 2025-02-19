- [ ] 로또 구입 금액을 입력한다. -> ui
  - [ ] 구입 금액 입력 받기 -> ui
  - [ ] 예외 처리 -> domain
    - [x] 1,000원으로 나누어 떨어지지 않는 경우
    - [x] 숫자가 아닌 경우
    - [x] 1,000원보다 작은 경우
    - [x] 구입 금액이 20,000을 초과할 경우
- [x] 구입 금액에 해당하는 만큼 로또를 발행해야 한다. -> domain
- [x] 로또 번호를 오름차순으로 정렬한다. -> domain
  - [ ] 정렬된 로또번호를 보여준다. -> ui
- [ ] 당첨 번호를 입력받는다. -> ui
  - 예외 처리 -> domain
    - [x] 숫자가 아닐 경우
    - [x] 1 미만 45 초과일 경우
    - [x] 번호가 중복되는 경우
- [ ] 보너스 번호를 입력받는다. -> ui
  - [ ] 예외 처리 -> domain
    - [x] 숫자가 아닐 경우
    - [x] 1 미만 45 초과일 경우
    - [x] 당첨 번호와 중복되는 경우
- [x] 사용자가 구매한 로또 번호와 당첨 번호를 비교한다. -> domain
  - [x] 사용자의 로또와 당첨 번호가 몇 개 동일한지 비교한다.
  - [x] 사용자의 로또에 보너스 번호가 존재하는지 확인한다.
  - [x] 5개 번호 + 보너스 번호가 일치하는지 확인한다.
- [ ] 당첨 내역 출력한다. -> ui
  - [ ] 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다. -> ui
        1등: 6개 번호 일치 / 2,000,000,000원
        2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
        3등: 5개 번호 일치 / 1,500,000원
        4등: 4개 번호 일치 / 50,000원
        5등: 3개 번호 일치 / 5,000원
- [ ] 수익률을 출력한다. -> ui
  - [ ] 수익률을 계산한다. -> domain
- [ ] 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다. -> ui
  - [ ] 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다. -> domain
- [ ] 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시킨다. -> domain
- [ ] 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다. -> ui
