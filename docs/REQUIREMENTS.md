# 기능구현목록 #

1. input = 복권 구입 금액 받기
- [x] validation : 1000원단위로 들어오기/ 숫자/ 공백

2. input -> controller.js 넣기

3. controller.js 에서 입력한 금액 / 1000만큼 lotto 발급. 
- [x] 중복되지 않게 6개의 숫자 (1 ~ 45)
- [x] 오름차순으로 정렬

4. 랜덤 생성한 복권 프린트하기
- [x] [1, 3, 5, 14, 22, 45] ...

5. input = 복권 번호 받기 / 
- [x] ","로 구분
- [x] validation : 숫자형 / 1 ~ 45 / 중복없이 6개 / 공백X

6. input = 보너스 번호 받기 / 
- [x] validation : 숫자형 / 1 ~ 45 / 복권번호와 중복 확인 / 공백X

7. 결과 계산 로직 만들기
- [x] 1. 복권번호 input을 lotto 객체 안으로 넣어서 확인
- [x] 2. 보너스 번호 input을 lotto 객체 안으로 넣어서 확인
- [x] 3. lotto와 Bonus 객체에서 계산한 결과를 Controller가 lottoResult에게 전달
- [x] 4. lottoResult에서 등수 계산, 상금 계산, 수익률 계산. -lottoResult:객체

8. output = 결과 출력
- [x] 등수 별 인원 출력
- [x] 당첨금 출력
- [x] 수익률 출력

9. input = 다시 하기
- [x] validation : y/n가 아닌 경우. 대소문자 관계 없이 y/n 가능하도록


Validation.lottoNumbers(numbers) 리팩토링 