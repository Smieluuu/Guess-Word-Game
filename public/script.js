$(document).ready(function () {
  const inputs = document.getElementsByTagName("input");
  const inputsLength = inputs.length;
  const pattern = [
    "A",
    "a",
    "Ą",
    "ą",
    "B",
    "b",
    "C",
    "c",
    "Ć",
    "ć",
    "D",
    "d",
    "E",
    "e",
    "Ę",
    "ę",
    "F",
    "f",
    "G",
    "g",
    "H",
    "h",
    "I",
    "i",
    "J",
    "j",
    "K",
    "k",
    "L",
    "l",
    "Ł",
    "ł",
    "M",
    "m",
    "N",
    "n",
    "Ń",
    "ń",
    "O",
    "o",
    "Ó",
    "ó",
    "P",
    "p",
    "R",
    "r",
    "S",
    "s",
    "Ś",
    "ś",
    "T",
    "t",
    "U",
    "u",
    "W",
    "w",
    "Y",
    "y",
    "Z",
    "z",
    "Ź",
    "ź",
    "Ż",
    "ż",
  ];

  const chances = [null, null, null, null, null];
  let word = ["", "", "", "", ""];

  const activeLine = (lineId) => {
    console.log(lineId);
    for (let i = 0; i < inputsLength; i++) {
      const input = inputs[i];
      input.disabled = false;
      if (input.parentElement.id !== lineId) {
        input.disabled = true;
      }
    }
  };

  activeLine("0");
  const submitLine = (lineId) => {
    const nextLine = (Number(lineId) + 1).toString();

    if (word.length === 5) {
      const submitedWord = word.join("");

      word = ["", "", "", "", ""];
      chances[lineId] = submitedWord;

      $.post("/api/check", { word: submitedWord }).then((response) => {
        console.log(response);

        if (response.success == true) {
          $("input").prop("disabled", "true");
          alert("Zgadłeś!");
          response.correctLetter.forEach((index) => {
            document
              .getElementById(`${lineId}-${index}`)
              .classList.add("correct");
          });
        } else {
          response.closeLetter.forEach((index) => {
            document
              .getElementById(`${lineId}-${index}`)
              .classList.add("close");
          });
          response.correctLetter.forEach((index) => {
            document
              .getElementById(`${lineId}-${index}`)
              .classList.add("correct");
          });
          activeLine(nextLine);
        }
      });

      activeLine(nextLine);
      document.getElementById(nextLine + "-0").focus();

      if (submitedWord.length !== 5) {
        alert("Słowo musi mieć 5 liter");
      }
      console.log("Słowo: " + submitedWord);
    }
  };

  for (let i = 0; i < inputsLength; i++) {
    const input = inputs[i];

    input.addEventListener("keydown", (event) => {
      var keyId = event.keyCode;

      if (keyId === 8) {
        event.preventDefault();
        event.target.value = "";
        const previousInput = event.target.previousElementSibling;

        previousInput.focus();
      }
    });

    input.addEventListener("keypress", (e) => {
      const key = e.key.toUpperCase();

      if (key === "ENTER") {
        const id = e.target.id.split("-");
        const line = id[0];

        submitLine(line);
        return;
      }

      if (pattern.includes(key)) {
        const nextInput = e.target.nextElementSibling;
        const id = e.target.id.split("-");
        const line = id[0];
        const charIndex = id[1];

        e.target.value = key;

        word[charIndex] = key;

        if (nextInput) {
          nextInput.focus();
        }
      }
    });
  }
});
