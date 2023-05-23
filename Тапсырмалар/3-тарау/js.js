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
        question: "Компьютерлік вирус дегеніміз не?",
        options: ["Компьютердің жұмысын жылдамдататын бағдарлама.", "Өзін-өзі репликациялауға және басқа компьютерлерге таратуға қабілетті зиянды бағдарлама.", "Деректерді шифрлаушы.", "Спам жіберу."],
        correct: "Өзін-өзі репликациялауға және басқа компьютерлерге таратуға қабілетті зиянды бағдарлама.",
    },
    {
        id: "1",
        question: "Компьютерлік вирустарды таратудың негізгі әдістері қандай?",
        options: ["Электрондық пошта, вирус жұққан веб-сайттар, USB дискілері.", "Иілгіш дискілер, радиотолқындар, әлеуметтік желілер.", "Ойындар, операциялық жүйе жаңартулары, онлайн чаттар.", "Баспа жарнамасы, пошталық, компакт-дискілер."],
        correct: "Электрондық пошта, вирус жұққан веб-сайттар, USB дискілері.",
    },
    {
        id: "2",
        question: "«Троялық жылқы» (троян) дегеніміз не?",
        options: ["Электрондық пошта арқылы таралатын компьютерлік вирус.", "Компьютердің техникалық құралдарының белгілі бір түрі.", "Пайдалы ретінде жасырылған зиянды бағдарлама.","Компьютерді вирустардан қалай қорғауға болады."],
        correct: "Пайдалы ретінде жасырылған зиянды бағдарлама.",
    },
    {
        id: "3",
        question: "Компьютерге вирус жұғудың салдары қандай?",
        options: ["Мәліметтердің жоғалуы, компьютердің баяулауы, жеке ақпаратты ұрлау.", "Интернетке қосылу жылдамдығын арттыру, өнімділікті жақсарту.", "Компьютеріңізді зиянды бағдарламалардан қорғауды жақсарту.", ") Мекенжай кітабындағы барлық контактілерге вирустық хабарламаларды жіберу."],
        correct: "Мәліметтердің жоғалуы, компьютердің баяулауы, жеке ақпаратты ұрлау.",
    },
    {
        id: "4",
        question: "Компьютеріңізді вирустардан қорғау үшін қандай қауіпсіздік шараларын қолдануға болады?",
        options: ["Интернеттен ажырату, антивирустық бағдарламалық құралды орнату.", "Әлеуметтік желілерде жеке мәліметтерді жариялау, әлсіз парольдерді пайдалану.", "Тексерілмеген көздерден бағдарламаларды жүктеу, электрондық пошта тіркемелерін ашу.", "Операциялық жүйені үнемі жаңартып отыру, күшті құпия сөздерді қолдану."],
        correct: "Операциялық жүйені үнемі жаңартып отыру, күшті құпия сөздерді қолдану.",
    },
    {
        id: "5",
        question: "Вирусқа қарсы бағдарламалық құрал дегеніміз не және ол не үшін қажет?",
        options: ["Вирустарды құруға арналған программа", "Компьютерлерді қорғауға арналған арнайы жабдық.", "Компьютерлік вирустарды анықтауға және жоюға арналған программа.", "Қауіпсіз қосылымды қамтамасыз ететін интернет-браузер."],
        correct: "Компьютерлік вирустарды анықтауға және жоюға арналған программа.",
    }, {
        id: "6",
        question: "Қандай белгілер компьютерде вирустың болуын көрсетуі мүмкін?",
        options: ["Тапсырмаларды жылдам орындау, қатесіз", "Компьютерді қайта іске қосу, жарнамалық терезелерді автоматты түрде ашу.", "Компьютер жұмысы кезіндегі дыбыс әсерлері, экран түсін өзгерту.", "ЖЖҚ көлемін ұлғайту, қатты дискіні кеңейту"],
        correct: "Компьютерді қайта іске қосу, жарнамалық терезелерді автоматты түрде ашу.",
    },
    {
        id: "7",
        question: "Компьютерлік вирус анықталған кезде қандай негізгі шараларды орындау керек?",
        options: ["Вирусқа қарсы бағдарламалық құралды жою, операциялық жүйені қайта орнату.", "Компьютерді қайта іске қосыңыз, антивирустық бағдарламалық құралды өшіріңіз.", "Антивирустық бағдарламалық құралмен толық жүйені қарап шығуды іске қосыңыз, анықталған вирустарды жойыңыз.", "Вирустың болуын елемеу, компьютерді пайдалануды жалғастыру."],
        correct: "Антивирустық бағдарламалық құралмен толық жүйені қарап шығуды іске қосыңыз, анықталған вирустарды жойыңыз.",
    },
    {
        id: "8",
        question: "«Жалған антивирус» дегеніміз не және онымен қалай күресуге болады?",
        options: ["Антивирустың жұмысын эмуляциялайтын қауіпсіздік бағдарламалық құралы.", "Антивирус болып көрінетін компьютерлік вирус.", "Жалған вирустармен күресуге арналған антивирустық бағдарламалық қамтамасыз етудің жеке түрі.", "Жалған антивирусты елемеңіз, ол қауіп төндірмейді."],
        correct: "Антивирус болып көрінетін компьютерлік вирус.",
    },
    {
        id: "9",
        question: "«Фишинг» дегеніміз не?",
        options: ["Мәліметтерді бір компьютерден екінші компьютерге көшіру процесі.", "Әлеуметтік желілер арқылы вирустардың таралуы.", "Жеке ақпаратты алу үшін пайдаланушыны манипуляциялау әдісі.", "Компьютерлік вирустарды жоюға арналған бағдарлама."],
        correct: "Жеке ақпаратты алу үшін пайдаланушыны манипуляциялау әдісі.",
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