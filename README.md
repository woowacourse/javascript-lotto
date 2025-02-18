# 🎱 javascript-lotto

## `Step1` 니야와 주렁의 페어 프로그래밍

## ✅ 기능 요구사항

### 입력

- [x] 구입금액
- [x] 당첨번호
- [x] 보너스 번호
- [ ] 게임 재실행

### 예외처리

- [x] 구입금액

  - [x] 숫자인지
  - [x] 1,000원 이상 인지
  - [x] 1,000원 단위 인지
  - [x] 100,000원 이하 인지

- [x] 당첨번호

  - [x] 숫자가 6개인지
  - [x] 숫자인지
  - [x] 정수인지
  - [x] 숫자의 범위가 1~45 사이인지
  - [x] 중복 안되는지

- [x] 보너스 번호

  - [x] 숫자인지
  - [x] 정수인지
  - [x] 숫자의 범위가 1~45 사이인지
  - [x] 당첨번호랑 중복 안되는지

- [ ] 게임 재실행

  - [ ] y,n 중에 하나인지

### 출력

- [ ] 발행된 로또
- [ ] 당첨 통계
- [ ] 수익률

### 기능

- [ ] 구입 금액에 해당하는 만큼 로또 발행
- [ ] 발행된 로또 오름차순 정렬
- [ ] 사용자가 구매한 로또 번호와 당첨 번호 비교
- [ ] 당첨 번호와 5개가 일치는 경우 보너스 번호 비교
- [ ] 수익률 계산
- [ ] 게임 재실행
- [x] 예외 발생시 재입력 요구

## ✅ 커밋 메시지

- feat : 새로운 기능을 추가한 경우
- fix : 버그 수정
- docs : 문서를 수정한 경우
- style : 코드 스타일, 포멧, 주석을 변경
- refactor : 코드 리팩토링
- test : 테스트 관련 코드를 수정한 경우
- chore : 코드 수정이 아닌, 단순 폴더명 파일명 등을 수정한 경우
