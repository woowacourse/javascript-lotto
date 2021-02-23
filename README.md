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

### 🎯 step1 구입 기능

- [ ] 로꼬 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
- [ ] 로또 1장의 가격은 1,000원이다.
- [ ] 소비자는 **자동 구매**를 할 수 있어야 한다.
- [ ] 복권 번호는 번호보기 토글 버튼을 클릭하면, 볼 수 있어야 한다.

### 🎯🎯 step2 당첨 결과 기능

- [ ] 결과 확인하기 버튼을 누르면 당첨 통계, 수익률을 모달로 확인할 수 있다.
- [ ] 로또 당첨 금액은 고정되어 있는 것으로 가정한다.
- [ ] 다시 시작하기 버튼을 누르면 초기화 되서 다시 구매를 시작할 수 있다.

### 🎯🎯🎯 step3 수동 구매

- [ ] 소비자는 수동 구매(스스로 구매 번호를 입력)를 할 수 있어야 한다.
  - 수동 구매를 위한 input UI는 스스로 구현한다.
- [ ] 수동 구매 후 남는 금액이 있다면 자동으로 구매할 수 있어야 한다.
- [ ] 위 기능들이 정상적으로 동작하는지 Cypress를 이용해 테스트한다.

<br>

## ⚙️ Before Started

#### <img alt="Tip" src="https://img.shields.io/static/v1.svg?label=&message=Tip&style=flat-square&color=673ab8"> 로컬에서 서버 띄워서 손쉽게 static resources 변경 및 확인하는 방법

로컬에서 웹서버를 띄워 html, css, js 등을 실시간으로 손쉽게 테스트해 볼 수 있습니다. 이를 위해서는 우선 npm이 설치되어 있어야 합니다. 구글에 `npm install` 이란 키워드로 각자의 운영체제에 맞게끔 npm을 설치해주세요. 이후 아래의 명령어를 통해 실시간으로 웹페이지를 테스트해볼 수 있습니다.

```
npm install -g live-server
```

실행은 아래의 커맨드로 할 수 있습니다.

```
live-server 폴더명
```

<br>

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/javascript-lotto/issues)에 등록해주세요.

<br>

## 📝 License

This project is [MIT](https://github.com/woowacourse/javascript-lotto/blob/main/LICENSE) licensed.

## 1. 환경설정

1. yarn을 이용하여 package 초기화: `yarn init`
2. cypress 설치: `yarn add cypress --dev`
3. eslint 설치: `yarn add eslint --dev`
4. prettier 설치: `yarn add prettier --dev --exact`
   - .prettier.json 설정: `echo {}> .prettierrc.json` // 별도로 옵션을 설정하지 않고 기본 설정 그대로 사용한다
   - .prettierignore 설정: cypress/integration 외 cypress내 디렉토리는 모두 무시하도록 설정
5. eslint-config-prettier 설치: `yarn add eslint-config-prettier --dev`
6. eslint-config-cypress 설치: `yarn add eslint-config-cypress --dev`
7. eslint 설정: `yarn eslint --init`
   - prettier, cypress plugins 및 extends 추가
   - eslint:recommended 컨벤션 적용
8. .vscode/settings.json 설정
   - 모든 파일에 대하여 저장시 eslint 및 prettier 적용
   - editor 탭사이즈는 2, 탭 대신 스페이스 사용
   - 패키지매니져로 yarn을 사용함을 명시
   - 항상 마지막 줄에 빈 라인을 추가

## 2. 기능 구현 목록


### 기능

- [X] 로또 발급(자동 구매)
  - 랜덤 번호 생성
    - 1 ~ 45 까지 중복되지 않은 6개의 번호를 각 로또 장수에 부여
  
- [X] 구입 금액 입력받기
    1. Given: 초기화면에 구입 입력 Form만 보여진다
    2. When: 금액을 입력한 후 확인 버튼을 클릭한다 (로또 1장의 가격은 1,000원이다.)
    3. Then: 
       - 금액이 초기화 된다.
       - 실패케이스: 음수 => alert로 표시한다. 소수의 경우, form 태그에서 자동적으로 걸러지므로 별도로 테스트하지 않는다.
       - 성공케이스: 입력된 금액으로 살 수 있는 로또 장수 만큼이 section부분이 표시된다. 
          - 추가 구매기능: 추가로 입력된 로또 장수 만큼이 기존 로또 장수에 더해져서 표시된다.   

- [X] 번호보기 토글
    1. Given: 유저가 구입할 금액을 입력하여 해당하는 로또 장수 만큼이 section에 포함되어 있다. 번호보기 토글은 비활성화되어 있다.
    2. When: 비활성화된 번호보기 토글을 클릭한다.
    3. Then:
       - 번호보기 토글이 파란색으로 활성화된다.
       - 각 로또 장수에 대한 숫자 6개가 표시된다.
       
    4. Given: 유저가 구입할 금액을 입력하여 해당하는 로또 장수 만큼이 표시된다. 각 로또 장수는 6개의 숫자를 표시되어 있다. 번호보기 토글은 활성화되어 있다.
    5. When: 활성화된 번호보기 토글을 클릭한다.
    6. Then:
       - 번호보기 토글이 회색으로 비활성화된다.
       - 로또 장수만큼 로또 아이콘이 표시된다. 각 로또 장수의 숫자 6개는 표시되지 않는다.

- [X] 당첨결과 확인하기
    1. Given: 유저가 정상적으로 로또를 구입했다.
    2. When: 당첨 번호와 보너스 번호를 입력하고 결과 확인버튼을 클릭한다.
    3. Then: 
      - 실패케이스: 중복, 1에서 45이하의 정수가 아닌 수, 입력이 되지 않은 상황인 경우 alert를 발생시킨다. 잘못된 input태그의 value를 초기화한 후 해당 태그로 focus한다.
      - 성공케이스: 당첨 결과에 대한 모달을 띄우고, 다시 시작하기 버튼이 나타난다.
         - 일치 갯수와 부합하는 로또의 갯수를 분류하여 결과모달에 표시한다.
         - X 버튼을 눌렀을 경우에 결과화면 결과모달이 닫힌다.
         - 유저가 구매한 로또 정보에 대한 수익률을 결과모달에 표시한다.
           - 수익률은 소숫점 셋째자리에서 반올림하여 %표기법으로 표시한다.(예시: 1086.4788... -> 1,086.48%)

- [ ] 다시시작하기 
    1. Given: 유저가 구입한 로또의 당첨 결과 화면이 모달로 나타나 있다.
    2. When: 유저가 다시 시작하기 버튼을 클릭한다.
    3. Then: 모달창이 닫히고 유저가 구매한 로또 정보와 당첨 번호에 대한 모든 데이터가 초기화 된다.
