/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
const ControllerLotto = require('../src/controller/ControllerLotto.js');
class Step1 {
  play() {
    const controllerLotto = new ControllerLotto();
    controllerLotto.playLotto();
  }
}

const step1 = new Step1();
step1.play();
