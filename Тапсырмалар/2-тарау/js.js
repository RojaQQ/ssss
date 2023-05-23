//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Веб-браузер дегеніміз не?",
        options: ["Веб-сайттарды жасауға арналған компьютерлік бағдарлама", "Электрондық хаттарды жіберу және қабылдау бағдарламасы.", "Web-беттерді қарауға және Интернетте шарлауға арналған бағдарлама", "Интернетке қосылуға арналған арнайы жабдық."],
        correct: "Web-беттерді қарауға және Интернетте шарлауға арналған бағдарлама",
    },
    {
        id: "1",
        question: "Екі факторлы аутентификация дегеніміз не?",
        options: ["Веб-сайтты блоктауды айналып өту әдісі.", "Екі түрлі құпия сөзді қажет ететін аутентификация әдісі.", "Екі түрлі құрылғы немесе факторлар арқылы пайдаланушының жеке басын тексеру процесі.", "Мәліметтерді шифрлаудың ерекше түрі."],
        correct: "Екі түрлі құрылғы немесе факторлар арқылы пайдаланушының жеке басын тексеру процесі.",
    },
    {
        id: "2",
        question: "HTTPS нені білдіреді?",
        options: ["Гипермәтінді тасымалдау протоколы", "Гиперсілтеме мәтінінің қауіпсіздік протоколы.", "шифрлау протоколының стандарты","Жоғары тиімділік құпиялылық және қауіпсіздік протоколы."],
        correct: "Гипермәтінді тасымалдау протоколы",
    },
    {
        id: "3",
        question: "Фишинг дегеніміз не?",
        options: ["Ақпаратты рұқсат етілмеген қол жеткізуден қорғау техникасы.", "Интернет қауіпсіздігі үшін деректерді шифрлау түрі", "Электрондық пошта арқылы таралатын вирус түрі.", "Жеке ақпаратты алу мақсатында пайдаланушыны манипуляциялау әдісі."],
        correct: "Жеке ақпаратты алу мақсатында пайдаланушыны манипуляциялау әдісі.",
    },
    {
        id: "4",
        question: "VPN нені білдіреді?",
        options: ["Виртуалды жеке желі", "Расталған жеке нөмір.", "Бейнені ойнату желісі.", "Өте қуатты түйін "],
        correct: "Виртуалды жеке желі",
    },
    {
        id: "5",
        question: "Төлем картасының алаяқтығы (кардинг) дегеніміз не?",
        options: ["Әлеуметтік желілерде жеке мәліметтерді жариялау.", "Интернет арқылы контрафактілік тауарларды сату.", "Қаржылық деректерді заңсыз пайдалану үшін ұрлау", "Электрондық пошта арқылы вирустардың таралуы."],
        correct: "Қаржылық деректерді заңсыз пайдалану үшін ұрлау",
    }, {
        id: "6",
        question: "Интернет контекстіндегі «cookie» дегеніміз не?",
        options: ["Зиянды бағдарлама түрі.", "Жарнамалар бар қалқымалы терезе.", "Кірген веб-сайттар мен пайдаланушы қалаулары туралы ақпаратты сақтайтын файл.", "«Коммуникация және ақпарат алмасу» аббревиатурасы."],
        correct: "Кірген веб-сайттар мен пайдаланушы қалаулары туралы ақпаратты сақтайтын файл.",
    },
    {
        id: "7",
        question: "Деректерді шифрлау дегеніміз не?",
        options: ["Веб-сайтты блоктауды айналып өту әдісі.", "Мәліметтерді түсініксіз формаға түрлендіру арқылы рұқсат етілмеген тұлғалардан ақпаратты жасыру процесі.", "Интернет пайдаланушылары туралы жеке ақпаратты алу әдісі.", "Компьютерді вирустардан қорғауға арналған бағдарлама."],
        correct: "Мәліметтерді түсініксіз формаға түрлендіру арқылы рұқсат етілмеген тұлғалардан ақпаратты жасыру процесі.",
    },
    {
        id: "8",
        question: "DDoS шабуылы нені білдіреді?",
        options: ["Бөлінген құжатты ортақ пайдалану шабуылы.", "Қауіпті қызмет көрсетуден бас тарту шабуылы.", "Арнайы деректерді сақтау шабуылы.", "Бөлінген қызмет көрсетуден бас тарту шабуылы."],
        correct: "Бөлінген қызмет көрсетуден бас тарту шабуылы.",
    },
    {
        id: "9",
        question: "Деректердің сақтық көшірмесі дегеніміз не?",
        options: ["Қауіпсіздік үшін деректерді шифрлау.", "Интернеттен файлдарды жүктеп алу.", "жоғалған немесе бүлінген жағдайда оларды сақтау және қалпына келтіру үшін деректердің көшірмесін жасау.", "Компьютерде вирустарды тексеру процесі."],
        correct: "жоғалған немесе бүлінген жағдайда оларды сақтау және қалпына келтіру үшін деректердің көшірмесін жасау.",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Сіздің жинаған баллыныз " + scoreCount + "/" + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " / " + quizArray.length + " Сұрақтан";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};