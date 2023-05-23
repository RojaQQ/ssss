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
        question: "«Криптография» сөзі грек тілінен аударғанда қандай мағына береді?",
        options: ["шифр", "түрлендіру", "Жасырын жазба", "шифрды шешу"],
        correct: "Жасырын жазба",
    },
    {
        id: "1",
        question: "Бастапқы мәтіннің әрбір әрпі әліпбиде одан әрі белгілі бір орындарда тұратын әріппен ауыстырылған, қолданылуы құжатталған «тарихи» шифр қалай аталады?",
        options: ["Марков шифры", "Цезарь шифры", " Бабаж шифры", "Жұмбақ шифр"],
        correct: "Цезарь шифры",
    },
    {
        id: "2",
        question: "Асимметриялық шифрлау криптографияда қашан қолданыла бастады?",
        options: ["XIX ғасырдың бірінші жартысында;", "XIX ғасырдың екінші жартысында;", "ХХ ғасырдың бірінші жартысында;", "ХХ ғасырдың екінші жартысында;"],
        correct: "ХХ ғасырдың екінші жартысында;",
    },
    {
        id: "3",
        question: "Түпнұсқа құпия хабарламаны қорғау мақсатында оны түрлендірудің алдын ала белгіленген тәсілдерінің жиынтығы қалай аталады?",
        options: ["Алгоритм", "Шифр", "Хаттама", "Перне"],
        correct: "Шифр",
    },
    {
        id: "4",
        question: "Кез келген шифр арқылы түрлендіруден кейін алынған хабарлама қалай аталады?",
        options: ["Жабық мәтін", "еліктеуіш кірістіру", "перне", " қарапайым мәтін"],
        correct: "Жабық мәтін",
    },
    {
        id: "5",
        question: "Криптографиядағы анық мәтін дегеніміз не?",
        options: [" бастапқы хабарлама (шифрлау алдындағы хабарлама) ", "электрондық цифрлық қолтаңба ", " кез келген шифрды пайдаланып түрлендіруден кейін алынған хабарлама ", "ашық кілтті шифрлау "],
        correct: " бастапқы хабарлама (шифрлау алдындағы хабарлама) ",
    }, {
        id: "6",
        question: "Ақпаратқа рұқсатсыз өзгертулер енгізудің мүмкін еместігіне кепілдік:",
        options: ["тұтастықты қамтамасыз ету ", "құпиялылық", "аутентификацияны қамтамасыз ету ", " шифрлауды қамтамасыз етеді "],
        correct: "тұтастықты қамтамасыз ету ",
    },
    {
        id: "7",
        question: "Құпиялылық?",
        options: [" ақпаратқа қол жеткізуге құқығы жоқ адамдардың оның мазмұнымен танысуынан қорғау мәселесін шешу", " ақпаратты тек бір адамға пайдалануға рұқсат беру ", " ақпаратты оған қол жеткізуге құқығы жоқ тұлғалардың өзгертуінен қорғау мәселесін шешу", "ақпаратқа қол жеткізу құқығы бар адамдардың оның мазмұнымен танысуынан қорғау мәселесін шешу "],
        correct: " ақпаратқа қол жеткізуге құқығы жоқ адамдардың оның мазмұнымен танысуынан қорғау мәселесін шешу",
    },
    {
        id: "8",
        question: "Тұтастық?",
        options: ["ақпарат көлемін рұқсатсыз өзгерту мүмкін еместігіне кепілдік беру ", " ақпаратты тек бір адамға пайдалануға рұқсат беру ", " ақпаратты оған қол жеткізуге құқығы жоқ тұлғалардың өзгертуінен қорғау мәселесін шешу", "ақпаратқа қол жеткізу құқығы бар адамдардың оның мазмұнымен танысуынан қорғау мәселесін шешу "],
        correct: "ақпарат көлемін рұқсатсыз өзгерту мүмкін еместігіне кепілдік беру ",
    },
    {
        id: "9",
        question: "«Криптография» терминінің дұрыс анықтамасын таңдаңыз?",
        options: ["криптография жаудан оны қызықтыратын ақпараттың болуы фактісін жасыру әрекетіне негізделген ақпаратты қорғау жолдарын зерттейді.", " криптография - шифрлау жүйелерінің құрылысы мен қолданылуын, соның ішінде олардың күштілігін, әлсіз жақтарын және әртүрлі шабуыл әдістеріне осалдық дәрежесін зерттеу.", "криптография – ашық байланыс арналары арқылы тасымалдау кезінде деректерді шифрлау туралы ғылым ", " криптография – ақпаратты криптографиялық қорғауды жеңу туралы ғылым"],
        correct: " криптография - шифрлау жүйелерінің құрылысы мен қолданылуын, соның ішінде олардың күштілігін, әлсіз жақтарын және әртүрлі шабуыл әдістеріне осалдық дәрежесін зерттеу.",
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
                questionCount + 1 + " / " + quizArray.length + "Сұрақтан";
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