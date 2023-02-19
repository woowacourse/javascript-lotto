# 1단계 기능구현목록 #

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
- [x] 3. lotto와 Bonus 객체에서 계산한 결과를 Controller가         lottoResult에게 전달
- [x] 4. lottoResult에서 등수 계산, 상금 계산, 수익률 계산. (lottoResult:객체)

8. output = 결과 출력
- [x] 등수 별 인원 출력
- [x] 당첨금 출력
- [x] 수익률 출력

9. input = 다시 하기
- [x] validation : y/n가 아닌 경우. 대소문자 관계 없이 y/n 가능하도록


# 2단계 구현 목록 #
1. html 만들기

    1.  내 당첨번호 확인
        - [x] header
        - [x] p + inputAmount 
        - [x] p + printLotto
        - [x] p(input설명) + inputLotto
        - [X] button = checkResult

    2. 당첨통계
        - [X] header
        - [X] winning table
        - [X] p = 수익률
        - [X] button = restart

2. css 만들기

    1. 내 당첨번호 확인
        - [X] header= text-align
        - [X] p + inputAmount
            - input/button: 비율
        - [X] label + printLotto
            - display:flex / overflow: scroll
            - img: 크기 맞추기 
        - [X] p = input설명
        - [X] label + inputLotto
            - 6자리 / 1자리= display: flex
            - 1자리.. = 왼쪽 정렬
        - [X] button = checkResult

    2. 당첨통계
        - [ ] header
            - h1
        - [ ] winning table
            - 가로줄
        - [ ] p = 수익률
            - border
        - [ ] button = restart

    3. js 연결
        - [ ] 구입 버튼 누르면 amount input 입력하기
        - [ ] print lotto 연결하기
        - [ ] 결과 확인 누르면 당첨번호/보너스 번호 input으로 입력하기
        - [ ] 결과 표에 띄우기 + 수익률 띄우기
        - [ ] 다시 시작하기 버튼으로 restart처리하기 