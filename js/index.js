//challenge 1: Your Age in Days
function ageInDays() {
  let birthYear = prompt(" What year you were born in?");
  let aegInDayss = (2020 - birthYear) * 365;
  let h1 = document.createElement("h1");
  let textAnswer = document.createTextNode(
    "you are " + aegInDayss + " days old."
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove(this.editor);
}

//challenge 2: Generate cat
function generateCat() {
  let image = document.createElement("img");
  let div = document.getElementById("flex-cat-gen");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
}

//  challenge 3: Rock, Paper, Scissor---->
function rpsGame(yourChoice) {
  //console.log(yourChoice);
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(randToRpsInt());
  //console.log("computerChoice:", botChoice);
  result = decideWinner(humanChoice, botChoice);
  //console.log(result);
  message = finalMessage(result); // {'message' : 'You Won', 'color': 'green'}
  //console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

//bot's random number between 1-3
function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  let yourScore = rpsDatabase[yourChoice][computerChoice];
  let computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You Lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You Tied", color: "yellow" };
  } else {
    return { message: "You Youn", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  let ImagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  //remove all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  let humanDiv = document.createElement("div");
  let botDiv = document.createElement("div");
  let messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    ImagesDatabase[humanImageChoice] +
    " ' height=150 width=150 style=' box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  botDiv.innerHTML =
    "<img src='" +
    ImagesDatabase[botImageChoice] +
    " ' height=150 width=150 style=' box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    "; font-size: 60px; padding: 30px;'>" +
    finalMessage["message"] +
    "</h1>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

//  challenge 4: Change the Color the of All Buttons---->
let all_buttons = document.getElementsByTagName("button");
//console.log(all_buttons);
let copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}
//console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonsReset();
  } else if (buttonThingy.value === "random") {
    buttonsRandom();
  }
}

// all the buttons will be red
function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

// all the buttons will be Green
function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

// all the buttons will be reseted
function buttonsReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

// all the buttons will be randomly changed
function buttonsRandom() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

//  challenge 5: BlackJack
let blcakjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const hitSound = new Audio("resources/sounds/swish.m4a");
const winSound = new Audio("resources/sounds/cash.mp3");
const lossSound = new Audio("resources/sounds/aww.mp3");

const YOU = blcakjackGame["you"];
const DEALER = blcakjackGame["dealer"];

//hit button event
document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

//stand button event
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackStand);

//deal button event
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

//hit button function
function blackjackHit() {
  if (blcakjackGame["isStand"] === false) {
    let card = randomCard();
    //console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    //console.log(YOU["score"]);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//stand button Dealer logic
async function blackjackStand() {
  blcakjackGame["isStand"] = true;

  while (DEALER["score"] < 16 && blcakjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(800);
  }

  blcakjackGame["turnsOver"] = true;
  let winner = computeWinner();
  //console.log(winner);
  showResult(winner);
}

//random card function
function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blcakjackGame["cards"][randomIndex];
}

// showing card images
function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let CardImage = document.createElement("img");
    CardImage.src = `resources/images/card/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(CardImage);
    hitSound.play();
  }
}

//removes all Deal button
function blackjackDeal() {
  if (blcakjackGame["turnsOver"] === true) {
    blcakjackGame["isStand"] = false;
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (let i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#your-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "black";

    blcakjackGame["turnsOver"] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    //if adding 11 keeps me below 21 add 11 other wise adds 1
    if (activePlayer["score"] + blcakjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blcakjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blcakjackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blcakjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

//compute winner and return result
//updating wins,losses,draws
function computeWinner() {
  let winner;

  if (YOU["score"] <= 21) {
    // conditions: higher score than dealer or dealer busts but your 21 or less
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blcakjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blcakjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blcakjackGame["draws"]++;
    }
    //condition when user bust but dealer dosent
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blcakjackGame["losses"]++;
    winner = DEALER;
  }
  //condition when you and dealer both bust
  else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blcakjackGame["draws"]++;
  }
  console.log(blcakjackGame);
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blcakjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blcakjackGame["wins"];
      message = "You Won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blcakjackGame["losses"];
      message = "You Lost!";
      messageColor = "red";
      lossSound.play();
    } else {
      document.querySelector("#draws").textContent = blcakjackGame["draws"];
      message = "You Drew!";
      messageColor = "black";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
