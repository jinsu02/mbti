import { questions } from './data.js'
//가져오다, 파일을 가져올거임. / data.js에서 questions라는 데이터 배열을 가져온다.
//js에서 import라는 키워드를 사용하려면 html에서 import키워드를 사용하는 js를 가지고 올 때
//html의 script주소 태그에 하나의 속성을 추가해줘야한다. type="module" <script type="module" defer src="./js/questions.js"></script>
//type="module" 이라는 의미는 questions.js에서 다른 js파일을 가져와서 쓸 수 있다,파일로 구분되어있다는 의미 (?)
//question.js의 파일의 타입이 파일로 구분된 내용들을 가져와서 쓰는 모듈 타입이다, 라는 의미
//questions.html에서 import키워드를 쓸려면 type=module을 꼭 써야한다. import를 안쓰면 안써도 됨.

const progressValueEl = document.querySelector('.progress .value')
const numberEl = document.querySelector('.number')
const questionEl = document.querySelector('.question')
const choice1El = document.querySelector('.choice1')
const choice2El = document.querySelector('.choice2')

//const로 html에 있는 선택자를 할당함
//const 키워드는 데이터 재할당 불가. let은 재할당 가능

let currentNumber = 0 //현재 질문의 번호가 몇번인지 표시하는 수. 계속 번호가 달라지니까 let으로 해야함
let mbti = '' //실제 결과 페이지로 이동하는 용도로 사용. 사용자의 선택에 따른 mbti결과가 여기에 담긴다.

function renderQuestion() { //아래 questions가 import키워드로 data.js에서 가져온것.
    const question = questions[currentNumber] //questions 배열 데이터에서 0번째 데이터를 꺼내서 question이라는 변수에 할당해서 쓰겠다./currentNumber를 쓰면 다음 질문으로 넘어가게 해주고 숫자도 커짐.
    numberEl.innerHTML = question.number //='01'이라는 문자데이터를 입력하는 것과 똑같다. question 객체데이터에 있는 number라는 값을 할당하겟다.
    questionEl.innerHTML = question.question 
    //퀘스쳔 엘리먼트라는 요소에서 이너에이치티엠엘 명령을 실행해주고 이퀄기호로 할당연산자를 사용해준 다음,
    //현재 질문을 의미하는 question이라는 객체데이터에서 question이라는 속성의 내용을 할당함.
    //속성 : data.js에서 question속성을 의미.
    choice1El.innerHTML = question.choices[0].text
    choice2El.innerHTML = question.choices[1].text
    progressValueEl.style.width = (currentNumber + 1) * 10 + '%' //프로그레스바 증가에 대한 것
}

function nextQuestion(choiceNumber) {
    if (currentNumber === 9) { //현재 페이지가 마지막 질문 페이지라면 결과 페이지로 넘어간다. + question.length - 1 해도 마지막 페이지를 의미 -1하는 이유는 Js에서는 0부터 수를 세기 떄문
        showResultPage()        //showResultPage라는 함수를 실행한다.
        return
    }
    const question = questions[currentNumber] //다음 질문으로 넘어가기 전에 현재 질문에 대한 정보를 Question이라는 변수에 담아서 이 함수 내부에서 사용을 할 수 있게 됨.
    mbti = mbti + question.choices[choiceNumber].Value //data.js에 있는 내용을 할당한거임. Question이라는 질문 객체 안에 있는 choices의 배열 데이터에서 choicenumber라는 변수로 받은 그 값으로 질문을 선택해서 거기에 들어있는 Value라는 값을 쓴다.
    // mbti = '' + 'E' or 'I' / mbti = 'I' 이런 식으로 합쳐진다는 말. 다음 질문을 선택해서 계속 쌇이면 mbti = 'inf'이럭식으로 쌇인다.
    // mbti =(내용이 비워져 있는 단순 문자 데이터)
    // 2번 문제도 마찬가ㅣㅈ로 계속 mbti = + , + , + 됨 / mbti변수에 다시 할당됨.
    //choicen=Number 0또는 1을 선택하면 data.js에 있는 question.choice0 또는 1번의 Value가 할당된다는 의미. ex) value : i, Value : e
    currentNumber = currentNumber + 1 //currentNumber라는 현재 질문의 번호를 하나 증가시시켜 다음 질문으로 넘어가게 해줌.
                                        //currentNumber + 1해서 currentNumber에 다시 할당해줌.
    renderQuestion()  //다음 질문 출력
}

//걸과페이지
function showResultPage() {  //js로 페이지이동을 만들때는 location이라는 데이터를 사용
    location.href = '/results.html?mbti=' + mbti //쿼리스트링:주소에 정보를 담아서 전달. 주소 뒤에 붙은 ?abc=123이 정보이다. ?로 시작 데이터이름 =(할당) 정보값
}

//choice1,2를 클릭하면 위의 nextQestion이라는 함수를 실행하게 만듦.
choice1El.addEventListener('click', function () {
    nextQuestion(0) //선택지를 클릭하면 지정된 숫자 (0)이 위에 (ChoiceNumber)라는 변수로 들어감
})
choice2El.addEventListener('click', function () {
    nextQuestion(1)
})

//renderQuetion 출력
renderQuestion()