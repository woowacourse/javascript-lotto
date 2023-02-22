/* eslint-disable no-undef */
import './css/style.css';
import './css/layout.css';
import './css/modal.css';
import Common from './utils/common';
import Header from './view/containers/Header';

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
console.log('step2-index.js');
Common.initContainer("app", () => Header(), () => { });
