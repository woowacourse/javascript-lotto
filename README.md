## 기능 요구 사항

1. [입력] 구입 금액을 입력받는다.
   - [x] 숫자여야 한다
   - [x] 1000원 단위로 입력한다.
   - [x] 1000원 이상 10만원 이하
2. 구입 금액만큼 로또를 발행한다.
   - [x] 1 ~ 45 사이의 숫자로 발행한다.
   - [x] 중복없이 숫자를 발행한다.
   - [x] 번호는 오름차순으로 정렬한다.
3. [입력] 당첨 번호를 입력한다.
   - [x] 1 ~ 45 사이의 숫자로 입력한다.
   - [x] 중복없이 숫자를 입력한다.
4. [입력] 보너스 번호를 입력받는다.
   - [x] 1 ~ 45 사이의 숫자로 입력한다.
   - [x] 입력한 당첨 번호와 중복되면 안된다.
5. 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.
   - [x] 1 ~ 5등까지 계산한다. (일치 여부 확인)
   - ```
        1등: 6개 번호 일치 / 2,000,000,000원
        2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
        3등: 5개 번호 일치 / 1,500,000원
        4등: 4개 번호 일치 / 50,000원
        5등: 3개 번호 일치 / 5,000원
     ```
   - [x] (당첨된 전체 금액 / 구매 금액) \* 100
6. [입력] 재시작 여부를 입력받는다.
   - [x] Y/N으로 재시작 여부를 입력받는다.
   - [x] 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.

## 입력 공통

사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

### 당첨 출력 형식

```
당첨 통계
--------------------
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.
```
