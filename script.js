const header = document.querySelector(".header");
const headColor = document.querySelector(".header__color");
const navItems = document.querySelectorAll(".nav__item");
const container = document.querySelector(".main");
const state = document.querySelector(".state");

var tilesNum = 6;

// Random number generator
function randomNum(max) {
  return Math.floor(Math.random() * max);
}

// Reset game
function resetGame() {
  // reset new colors/play again
  navItems[0].textContent = "NEW COLORS";
  // reset state
  state.textContent = "";
  // reset header background color
  header.style.backgroundColor = "var(--main-blue)";
  // Delete previous squares
  const squares = document.querySelectorAll(".main__square");
  for (let i = 0; i < squares.length; i++) {
    squares[i].remove();
  }
}

// Create new game
function newGame(e) {
  for (let i = 0; i < e; i++) {
    const box = document.createElement("div");
    const randomColor = `RGB(${randomNum(256)}, ${randomNum(256)}, ${randomNum(
      256
    )})`;

    box.className = "main__square";
    box.style.backgroundColor = randomColor;

    // Win and lose events
    container.appendChild(box);
    box.addEventListener("click", () => {
      if (box.style.backgroundColor.toUpperCase() == headColor.textContent) {
        state.textContent = "Correct!";
        const squares = document.querySelectorAll(".main__square");
        header.style.backgroundColor = headColor.textContent;
        navItems[0].textContent = "PLAY AGAIN?";
        for (let i = 0; i < squares.length; i++) {
          squares[i].style.backgroundColor = headColor.textContent;
        }
      } else {
        state.textContent = "Try Again";
        box.style.backgroundColor = "transparent";
      }
    });
  }
}

//   Define answer
function defineAnswer(e) {
  const boxes = document.querySelectorAll(".main__square");
  headColor.textContent =
    boxes[randomNum(e)].style.backgroundColor.toUpperCase();
}


// Mode toggle
function modeToggle(){
  for (let i = 1; i < navItems.length; i++) {
    navItems[i].addEventListener("click", () => {
      // Call respective function
      if (i == 1 && navItems[1].style.backgroundColor !== "var(--main-blue)") {
        tilesNum = 3;
        addGameInfo(tilesNum);
      } else if (
        i == 2 &&
        navItems[2].style.backgroundColor !== "var(--main-blue)" &&
        navItems[2].style.backgroundColor !== ""
      ) {
        tilesNum = 6;
        addGameInfo(tilesNum);
      }

      // Switch background colors
      i == 1
        ? (navItems[2].style =
            "background-color: transparent; color: var(--main-blue);")
        : (navItems[1].style =
            "background-color: transparent; color: var(--main-blue);");

      navItems[i].style = "background-color: var(--main-blue); color: white;";
    });
  }
}



// Modes
function startGame() {
  addGameInfo(tilesNum);
  navItems[0].addEventListener("click", () => {
    addGameInfo(tilesNum);
  });
}

function addGameInfo (numOfTiles){
  resetGame();
  modeToggle()
  newGame(numOfTiles);
  defineAnswer(numOfTiles);
}

// Start in hard mode
startGame(tilesNum );
