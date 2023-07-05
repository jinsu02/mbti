import { results, mbtis } from './data.js'

//?mbti=isfj(쿼리스트링) js를 통해 쿼리스트링의 내용을 알아낼 수 있는 방법
const mbti = new URLSearchParams(location.search).get('mbti') //location.search라는 속성은 사용할 수 있는 물음표 뒤쪽에 쿼리스트링 정보를 가지고 있따.
//URLSearchParams라는 자바스크립트 명령을 통해 location.search에 해당하는 내용을 분석할 수 있다. get이라는 또다른 함수를 통해 mbti를 얻어올 수 있따.
//console.log(mbti)
const result = results[mbtis[mbti]];

const titleEl = document.querySelector('.page-title');
const characterEl = document.querySelector('.character');
const boxEls = document.querySelectorAll('.box');
const jobEls = document.querySelectorAll('.job');
const lectureEl = document.querySelector('.lecture');
const lectureImgEl = document.querySelector('.lecture img');

titleEl.innerHTML = result.title;
characterEl.src = result.character;
boxEls.forEach(function (boxEl, index) {
    boxEl.innerHTML = result.results[index]
});
jobEls.forEach(function (jobEl, index) {
    jobEl.innerHTML = result.jobs[index]
});
lectureEl.href = result.lectureUrl;
lectureImgEl.src = result.lectureImg;

//여기서 오류가 났는데 못 찾겠음.
//results.js:16 Uncaught TypeError: Cannot read properties of undefined (reading 'title')
//at results.js:16:28