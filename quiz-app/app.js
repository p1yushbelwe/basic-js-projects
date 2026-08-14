document.addEventListener("DOMContentLoaded", function (e) {
  let questionContainer = document.getElementById("question-container");
  let buttonContainer = document.getElementById("button-container");
  let prevButton = document.getElementById("prev-button");
  let nextButton = document.getElementById("next-button");

  let questionsData = [
    {
      id: 1,
      question: "What is the capital of India?",
      options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    },
    {
      id: 2,
      question: "What is the capital of Japan?",
      options: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
    },
    {
      id: 3,
      question: "What is the capital of Iran?",
      options: ["Tehran", "Isfahan", "Shiraz", "Tabriz"],
    },
    {
      id: 4,
      question: "What is the capital of Australia?",
      options: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
    },
  ];

  let userAnswers = JSON.parse(localStorage.getItem("answers")) || [];
  //   console.log(userAnswers);

  let i = 0;
  renderQuestion(questionsData[i]);
  renderOptions(questionsData[i]);

  nextButton.addEventListener("click", function (e) {
    prevButton.classList.remove("invisible");
    prevButton.classList.remove("pointer-events-none");
    i += 1;
    if (i === questionsData.length - 1) {
      nextButton.classList.add("invisible");
      nextButton.classList.add("pointer-events-none");
    }
    if (i >= questionsData.length) {
      i = questionsData.length - 1;
      return;
    }
    renderQuestion(questionsData[i]);
    renderOptions(questionsData[i]);
  });

  prevButton.addEventListener("click", function (e) {
    nextButton.classList.remove("invisible");
    nextButton.classList.remove("pointer-events-none");
    i -= 1;
    if (i === 0) {
      prevButton.classList.add("invisible");
      prevButton.classList.add("pointer-events-none");
    }
    if (i < 0) {
      i = 0;
      return;
    }

    renderQuestion(questionsData[i]);
    renderOptions(questionsData[i]);
  });

  // data is singleton like questionsData[i]; {} single object
  function renderOptions(data) {
    let optionButton = [];

    let optionsArrayFromData = data.options;

    buttonContainer.innerHTML = "";
    for (let i = 0; i < optionsArrayFromData.length; ++i) {
      let button = document.createElement("button");
      button.innerText = `${optionsArrayFromData[i]}`;
      // userA is a string data-id is 2
      // if both string match
      // optioArraFromData[i] is a string i = 2
      if (userAnswers[data.id - 1] === optionsArrayFromData[i]) {
        button.classList.add("!bg-indigo-800");
        console.log("ran");
      }

      button.addEventListener("click", function (e) {
        if (button.classList.contains("!bg-indigo-800")) {
          // console.log('ran');

          button.classList.remove("!bg-indigo-800");
          userAnswers[data.id - 1] = "";
          return;
        } else {
        }
        removeFromOthers(button);
        button.classList.add("!bg-indigo-800");
        userAnswers[data.id - 1] = button.textContent;
        console.log(userAnswers);

        saveLocal();
      });

      buttonContainer.appendChild(button);
    }
  }

  function removeFromOthers(node) {
    let nodeButtonContainer = document.querySelector("#button-container");
    let insideObjects = nodeButtonContainer.childNodes;

    insideObjects.forEach((each) => {
      each.classList.remove("!bg-indigo-800");
    });
  }

  function renderQuestion(data) {
    questionContainer.innerHTML = "";
    questionContainer.innerText = data.id + ") " + data.question;
  }

  function saveLocal() {
    localStorage.setItem("answers", JSON.stringify(userAnswers));
  }
});
