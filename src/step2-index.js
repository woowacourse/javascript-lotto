/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const app = express();

app.use(express.static(__dirname + '/../'));

app.listen(3000, () => {
  console.log('로또 게임 서버를 시작했습니다!');
});
