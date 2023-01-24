const questionEl = document.querySelector('.question__el')
const a_text = document.querySelector('.a__text')
const b_text = document.querySelector('.b__text')
const c_text = document.querySelector('.c__text')
const d_text = document.querySelector('.d__text')

const quizContainer = document.querySelector('.question-component')
const answerEls = document.querySelectorAll('.answer')
const postionImage = document.querySelector('.position-image')
let currentQuiz = 0
const progressContainer = document.querySelector('.progress__stats');


const quizData = [
    {
        question: 'mov eax, 0x5f ?',
        a: 'Move the value stored in eax to memory location 0x5f ',
        b: 'Move the value stored in memory location 0x5f to eax',
        c: 'Move the value 0x5f to memory location stored in eax',
        d: 'Move the value 0x5f to register eax',
        correct: 'd'
    },
    {
        question: 'mov eax, [0x5f] ?',
        a: 'Move the value stored in eax to memory location 0x5f',
        b: 'Move the value stored in memory location 0x5f to eax ',
        c: 'Move the value 0x5f to memory location stored in eax',
        d: 'Move the value 0x5f to register eax',
        correct: 'b'
    },
    {
        question: 'lea eax, [ebp+4] ?',
        a: 'Add 4 to the memory address referenced by ebp and move the address to eax',
        b: 'Add 6 to the memory address referenced by ebp and move the address to eax',
        c: 'Add 8 to the memory address referenced by ebp and move the address to eax',
        d: 'Add 4 to the value stored in ebp, and move the value to eax',
        correct: 'd'
    },
    {
        question: 'mov eax, [ebp+4] ?',
        a: 'Add 4 to the memory address referenced by ebp and move the address to eax',
        b: ' Add 4 to the value stored in ebp, and move the value to eax',
        c: 'Add 4 to the value stored in ebp, and move the value to ebq',
        d: 'Add 6 to the value stored in ebp, and move the value to eax',
        correct: 'a'
    },
    {
        question: 'mov eax, 0x5f shr eax, 2 ?',
        a: 'EAX is now 0x17 and CF is 1 ',
        b: 'EAX is now 0x2F and CF is 1',
        c: ' EAX is now 0x17 and CF is 0',
        d: 'EAX is now 0x2F and CF is 0',
        correct: 'a'
    },
    {
        question: 'mov eax, 0x5f ror eax, 2 ?',
        a: 'EAX is now 0x7D ',
        b: 'EAX is now 0xD7',
        c: 'EAX is now 0xD8',
        d: 'EAX is now 0x8D',
        correct: 'b'
    },
    {
        question: 'mov eax, 0x5f inc eax ?',
        a: 'EAX is now 0x7D ',
        b: 'EAX is now 0xD7',
        c: ' EAX is now 0x5E',
        d: 'EAX is now 0x60',
        correct: 'd'
    },
    {
        question: 'mov eax 0x5f not eax ?',
        a: 'EAX is now 0x7D ',
        b: 'EAX is now 0xD7',
        c: 'EAX is now 0xA0',
        d: ' EAX is now 0x60',
        correct: 'c'
    },
    {
        question: 'cmp eax, eax jne 0x40100 ?',
        a: 'The EIP will jump to 0x40100 and ZF will be set ',
        b: ' The EIP will move to the next instruction and ZF will be set',
        c: 'The EIP will jump to 0x40100 and ZF will not be set',
        d: 'The EIP will move to the next instruction and ZF will be set',
        correct: 'b'
    },
    {
        question: 'push eax ?',
        a: 'Push the contents of the EAX register to the bottom of the stack ',
        b: 'Push the contents of the top of the stack to the EAX register',
        c: 'Push the contents of the EAX register to the top of the stack',
        d: ' Push the contents of the bottom of the stack to the EAX register',
        correct: 'c'
    },
    {
        question: 'push eax ?',
        a: 'Pop the contents of the EAX register to the bottom of the stack',
        b: 'Pop the contents of the EAX register to the top of the stack',
        c: ' Pop the contents of the bottom of the stack to the EAX register',
        d: 'Pop the contents of the top of the stack to the EAX register',
        correct: 'd'
    },
];

loadQuiz(currentQuiz);

function loadQuiz(ind) {
    deselectAnswers()
    const currentQuizData = quizData[ind]

    questionEl.innerText = currentQuizData.question
    postionImage.src = `./assests/positions/position-${ind + 1}.png`
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
    progressContainer.innerHTML = `${ind + 1}/${quizData.length}`;
}

answerEls.forEach(el => {
    el.addEventListener('click', (e) => {
        const id = e.target.id;
        const elBtn = e.target;
        deselectAnswers()

        if (id) {
            if (id !== quizData[currentQuiz].correct) {
                elBtn.classList.add('highlight-red')
                return
            }
            if (id == quizData[currentQuiz].correct) {
                elBtn.classList.add('highlight-green')
                currentQuiz++
            }
            if (currentQuiz < quizData.length) {
                setTimeout(() => {
                    loadQuiz(currentQuiz)
                }, 500);
            } else {
                const model = document.querySelector('.model')
                const ui = document.querySelector('.ui-component')
                ui.style.filter = 'blur(2px)';
                model.style.display = 'block'
            }
        }
    })
})

function deselectAnswers() { answerEls.forEach(answerEls => {
    answerEls.classList.remove('highlight-red')
    answerEls.classList.remove('highlight-green')

}) }


if (document.querySelector('.model-close')) {
    const model = document.querySelector('.model')
    document.querySelector('.model-close').addEventListener('click', (e) => {
        location.reload();
        model.style.display = 'none'
    })
}