/* CROSSWORD GENERATOR WITH API (INCOMPLETE!)
  -------------------------------------------- */

document.addEventListener("DOMContentLoaded", function() {
    
  const showBtn = document.getElementsByClassName("show-items-btn");
  const items = document.querySelector(".items");
  const field = document.querySelector(".crossword-field");
  const params = {
    cellSize : 32,
    maxX     : 24,
    maxY     : 4,
    treshold : 4,
    direction: ["horizontal", "vertical"]
  };

  // GENERATE CROSSWORD
  showBtn[0].addEventListener("click", function() {
    const questions = [];
    const answers = [];
    const entries = [];
    const dir = Math.round(Math.random());

    if (items.innerHTML != "") {
      items.innerHTML = "";
      field.innerHTML = "";
    }

    function answersList(obj) {
      for (let i = 0; i < obj.length; i++) {
        const li = document.createElement("li");

        questions.push(obj[i].question);
        answers.push(obj[i].answer);

        li.innerText = obj[i].question;
        items.appendChild(li);
      }
    }

    function startingWord() {
      for (let i = 0; i < answers.length; i++) {
        const entry = answers[i].split("");
        entries.push(entry);
      }
      for (let i = 0; i < entries[0].length; i++) {
        const cell = document.createElement("div");
        field.appendChild(cell);
        cell.classList.add("cell");
        cell.innerText = entries[0][i];
      }
    }

    function startingPosition() {
      const cell = document.querySelectorAll(".cell");
      const top = Math.round(Math.random() * params.maxY) + params.treshold;
      const left = Math.round(Math.random() * params.maxX) + params.treshold;

      for (let i = 0; i < cell.length; i++) {
        if (dir == 0) {
          cell[i].style.left = left * params.cellSize + i * params.cellSize + "px";
          cell[i].style.top = top * params.cellSize + "px";
        } else {
          cell[i].style.left = left * params.cellSize + "px";
          cell[i].style.top = top * params.cellSize + i * params.cellSize + "px";
        }
      }
    }

    function showEntries() {
      console.log(answers);
      console.log(entries);

			// TODO: show entries here
    }

    // GET ENTRIES
    $.ajax({
      url: "http://rocky-shore-45098.herokuapp.com/"
    })
      .done(function(response) {
        const obj = JSON.parse(response);

        answersList(obj);
        startingWord();
        startingPosition();
        generateEntries();
      })
      .fail(function(error) {
        console.log("Error");
      });
  });

});