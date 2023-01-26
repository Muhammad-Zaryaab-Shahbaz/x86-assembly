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

const atemps = document.querySelector('.atemps');
const second = document.querySelector('.second');


// these totalAtemps show how many attemps acutual mades & total seconds incdicates that the remaining second 
let totalAtemps = 0;
let totalSeconds = 30;

// when user mades all of his atemps then shaffle will be true for questions options
let shaffle = false;

// valid actually used to check each second that there is no flag ?
let valid = true;


const quizData = [
    {
        question: 'mov eax, 0x5f ?',
        options: ['Move the value stored in eax to memory location 0x5f ', 'Move the value stored in memory location 0x5f to eax', 'Move the value 0x5f to memory location stored in eax', 'Move the value 0x5f to register eax'],
        correct: 3
    },
    {
        question: 'mov eax, [0x5f] ?',
        options: ['Move the value stored in eax to memory location 0x5f',
            'Move the value stored in memory location 0x5f to eax ',
            'Move the value 0x5f to memory location stored in eax',
            'Move the value 0x5f to register eax'],
        correct: 1
    },
    {
        question: 'lea eax, [ebp+4] ?',
        options: ['Add 4 to the memory address referenced by ebp and move the address to eax',
            'Add 6 to the memory address referenced by ebp and move the address to eax',
            'Add 8 to the memory address referenced by ebp and move the address to eax',
            'Add 4 to the value stored in ebp, and move the value to eax'],
        correct: 3
    },
    {
        question: 'mov eax, [ebp+4] ?',
        options: ['Add 4 to the memory address referenced by ebp and move the address to eax',
            ' Add 4 to the value stored in ebp, and move the value to eax',
            'Add 4 to the value stored in ebp, and move the value to ebq',
            'Add 6 to the value stored in ebp, and move the value to eax'],
        correct: 0
    },
    {
        question: 'mov eax, 0x5f shr eax, 2 ?',
        options: ['EAX is now 0x17 and CF is 1 ',
            'EAX is now 0x2F and CF is 1',
            ' EAX is now 0x17 and CF is 0',
            'EAX is now 0x2F and CF is 0'],
        correct: 0
    },
    {
        question: 'mov eax, 0x5f ror eax, 2 ?',
        options: ['EAX is now 0x7D ',
            'EAX is now 0xD7',
            'EAX is now 0xD8',
            'EAX is now 0x8D'],
        correct: 1
    },
    {
        question: 'mov eax, 0x5f inc eax ?',
        options: ['EAX is now 0x7D ',
            'EAX is now 0xD7',
            ' EAX is now 0x5E',
            'EAX is now 0x60'],
        correct: 3
    },
    {
        question: 'mov eax 0x5f not eax ?',
        options: ['EAX is now 0x7D ',
            'EAX is now 0xD7',
            'EAX is now 0xA0',
            ' EAX is now 0x60'],
        correct: 2
    },
    {
        question: 'cmp eax, eax jne 0x40100 ?',
        options: ['The EIP will jump to 0x40100 and ZF will be set ',
            ' The EIP will move to the next instruction and ZF will be set',
            'The EIP will jump to 0x40100 and ZF will not be set',
            'The EIP will move to the next instruction and ZF will not be set'],
        correct: 1
    },
    {
        question: 'push eax ?',
        options: ['Push the contents of the EAX register to the bottom of the stack ',
            'Push the contents of the top of the stack to the EAX register',
            'Push the contents of the EAX register to the top of the stack',
            ' Push the contents of the bottom of the stack to the EAX register'],
        correct: 2
    },
    {
        question: 'pop eax ?',
        options: ['Pop the contents of the EAX register to the bottom of the stack',
            'Pop the contents of the EAX register to the top of the stack',
            ' Pop the contents of the bottom of the stack to the EAX register',
            'Pop the contents of the top of the stack to the EAX register'],
        correct: 3
    },
];

loadQuiz(currentQuiz);

function loadQuiz(ind) {
    deselectAnswers()
    totalAtemps = 0;

    const currentQuizData = quizData[ind]
    let options = currentQuizData.options;
    let optionsInd = [0, 1, 2, 3];

    if (shaffle) {
        optionsInd.sort(() => Math.random() - 0.5);
    }

    questionEl.innerText = currentQuizData.question
    postionImage.src = `./assests/positions/position-${ind + 1}.png`

    a_text.innerText = options[optionsInd[0]]
    b_text.innerText = options[optionsInd[1]]
    c_text.innerText = options[optionsInd[2]]
    d_text.innerText = options[optionsInd[3]]

    progressContainer.innerHTML = `${ind + 1}/${quizData.length}`;

    totalAtemps = 0;
    totalSeconds = 30;
}

answerEls.forEach(el => {
    el.addEventListener('click', (e) => {
        if (!valid) return;
        const elBtn = e.target;
        deselectAnswers()

        // whenver user selects wrong option
        if (e.target.innerHTML !== quizData[currentQuiz].options[quizData[currentQuiz].correct]) {
            elBtn.classList.add('highlight-red')
            totalAtemps = totalAtemps + 1;
            if (totalAtemps > 3) return;
            atemps.innerHTML = `(${totalAtemps}/3)`;

            const modelMessage = document.querySelector('.model-pop-message');
            modelMessage.innerHTML = `You have ${3 - totalAtemps} ${3 - totalAtemps == 1 ? 'attempt' : 'attempts'} remaining.`
            const audioWrong = document.getElementById("audio-wrong");
            audioWrong.play();
            if (totalAtemps !== 3) { popUpFn(); valid = false }
           
            return
        }
        // whenver user selects correct option
        if (e.target.innerHTML == quizData[currentQuiz].options[quizData[currentQuiz].correct]) {
            elBtn.classList.add('highlight-green')
            currentQuiz++
            const audioCorrect = document.getElementById("audio-correct");
            audioCorrect.play();
        }

        // check if quiz question is last then show flag
        if (currentQuiz < quizData.length) {
            setTimeout(() => {
                loadQuiz(currentQuiz)
            }, 500);
        } else {
            const model = document.querySelector('.model')
            const ui = document.querySelector('.ui-component')
            ui.style.filter = 'blur(2px)';
            model.style.display = 'block'
            valid = false;
        }   

    })
})

function deselectAnswers() {
    answerEls.forEach(answerEls => {
        answerEls.classList.remove('highlight-red')
        answerEls.classList.remove('highlight-green')

    })
}

const popUpFn = () => {
    const model = document.querySelector('.model-pop');
    model.style.display = 'block';
    const ui = document.querySelector('.ui-component')
    ui.style.filter = 'blur(2px)';
}


// fun to authenticate each second.
setInterval(() => { authAtempsSeconds() }, 1000);
function authAtempsSeconds() {
    if (!valid) return;
    if (totalSeconds <= 10) second.style.color = '#f1685e'
    else second.style.color = 'white'

    if (totalSeconds == 0) {
        totalAtemps = totalAtemps + 1;
        totalSeconds = 30;
        second.innerHTML = `${totalSeconds}s`
        const modelMessage = document.querySelector('.model-pop-message');
        modelMessage.innerHTML = `You have ${3 - totalAtemps} attempts remaining `
        const audioWrong = document.getElementById("audio-wrong");
        audioWrong.play();
        if (totalAtemps !== 3) { popUpFn(); valid = false }
    }

    if (totalAtemps === 3 || totalAtemps > 3) {

        shaffle = true;
        const model2 = document.querySelector('.model2');
        model2.style.display = 'block';
        const ui = document.querySelector('.ui-component')
        ui.style.filter = 'blur(2px)';

        valid = false;
        return;
    } else {
        atemps.innerHTML = `(${totalAtemps}/3)`;
        second.innerHTML = `${totalSeconds}s`
        totalSeconds = totalSeconds - 1;


        return;
    }
}

// event listener for last flag as result
if (document.querySelector('.model-close')) {
    const model = document.querySelector('.model')
    document.querySelector('.model-close').addEventListener('click', (e) => {
        location.reload();
        model.style.display = 'none'
    })
}
if (document.querySelector('.restart-button')) {
    const model = document.querySelector('.model2')
    document.querySelector('.restart-button').addEventListener('click', (e) => {
        const ui = document.querySelector('.ui-component')
        ui.style.filter = 'blur(0px)';
        valid = true;
        currentQuiz = 0
        totalAtemps = 0;
        totalSeconds = 30;

        loadQuiz(currentQuiz)
        model.style.display = 'none'
    })
}
if (document.querySelector('.model-close-validing')) {
    const model = document.querySelector('.model2')
    document.querySelector('.model-close-validing').addEventListener('click', (e) => {
        const ui = document.querySelector('.ui-component')
        ui.style.filter = 'blur(0px)';
        valid = true;
        currentQuiz = 0
        totalAtemps = 0;
        totalSeconds = 30;

        loadQuiz(currentQuiz)
        model.style.display = 'none'
    })
}
if (document.querySelector('.model-close-pop')) {
    const model = document.querySelector('.model-pop')
    document.querySelector('.model-close-pop').addEventListener('click', (e) => {
        const ui = document.querySelector('.ui-component')
        ui.style.filter = 'blur(0px)';
        totalSeconds = 30;
        valid = true;
        model.style.display = 'none'
        deselectAnswers()
    })
}