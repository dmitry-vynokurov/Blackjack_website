// Chalange 1

function ageIndays() {
    var yearOfbirth = prompt("What is your birth year?");
    var ageIndays = (2020 - yearOfbirth) * 365;
    var h1 = document.createElement("h1");
    var answer = document.createTextNode("You are " +  ageIndays + " days old");
    h1.setAttribute("id", ageIndays);
    h1.appendChild(answer);
    document.getElementById("result").appendChild(h1);

}

function reset() {
    document.getElementById("result").innerHTML = "";
}

// Chalange2: Cat Generator
function genegateCat() {
    var image = document.createElement("img");
    var div = document.getElementById("cat-gen");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Chalange 3: Rock, Paper, Scissors
function rpsgame(choise) {
    var humanChoise = choise.id;
    var computer = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    winner = selectWinner(humanChoise, computer);
    display(humanChoise, computer, winner);
}

function selectWinner(humanChoise, computer){
    if (humanChoise === computer){
        winner = "Draw";
    }
    else if ((computer == "paper" && humanChoise == "rock") || (computer == "rock" && humanChoise == "scissors") || (computer == "scissors" && humanChoise == "paper")){
        winner = "You lost";
    }
    else{
        winner = "You Won !";
    }
    return winner;
}

function display(humanChoise, computer, winner){
    humanimg = document.getElementById(humanChoise).src;
    computerimg = document.getElementById(computer).src;

    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humandiv = document.createElement("div");
    var messagediv = document.createElement("div");
    var computerdiv = document.createElement("div");

    if (winner == "You lost"){
        winner_color = "red";
    }
    else if (winner == "You Won !"){
        winner_color = "green";
    }
    else {
        winner_color = "yellow";
    }

    humandiv.innerHTML = "<img src='" + humanimg + "' height='150px' style='box-shadow: 0px 10px 50px rgba(37, 50,223, 1);'>";
    messagediv.innerHTML = "<h1 style='color: " + winner_color + "; font-size: 60px; padding: 30px;'>" + winner + "<h1/>";
    computerdiv.innerHTML = "<img src='" + computerimg + "' height='150px' style='box-shadow: 0px 10px 50px rgba(223, 50,23, 1);'>";

    document.getElementById("rps-game").appendChild(humandiv);
    document.getElementById("rps-game").appendChild(messagediv);
    document.getElementById("rps-game").appendChild(computerdiv);
}

// Chalane 4: Change color of all buttons

var allbuttons = document.getElementsByTagName("button");

var originalbuttons = [];
for (let i = 0; i < allbuttons.length; i += 1){
    originalbuttons.push(allbuttons[i].classList[1]);
}

function buttons_color(action){
    if (action.value == "red"){
        for (let i = 0; i < allbuttons.length; i += 1){
            allbuttons[i].classList.remove(allbuttons[i].classList[1]);
            allbuttons[i].classList.add("btn-danger");
        }
    }
    else if (action.value == "blue"){
        for (let i = 0; i < allbuttons.length; i += 1){
            allbuttons[i].classList.remove(allbuttons[i].classList[1]);
            allbuttons[i].classList.add("btn-primary");
        }
    }
    else if (action.value == "green"){
        for (let i = 0; i < allbuttons.length; i += 1){
            allbuttons[i].classList.remove(allbuttons[i].classList[1]);
            allbuttons[i].classList.add("btn-success");
        }
    }
    else if (action.value == "yellow"){
        for (let i = 0; i < allbuttons.length; i += 1){
            allbuttons[i].classList.remove(allbuttons[i].classList[1]);
            allbuttons[i].classList.add("btn-warning");
        }
    }
    else if (action.value === "random") {
        var choises = ["btn-danger", "btn-primary", "btn-success", "btn-warning"];
        for (let i = 0; i < allbuttons.length; i += 1){
            var randint = Math.floor(Math.random() * 4);
            allbuttons[i].classList.remove(allbuttons[i].classList[1]);
            allbuttons[i].classList.add(choises[randint])
        }
    }
    else if (action.value === "reset"){
        for (let i = 0; i < allbuttons.length; i += 1){
            allbuttons[i].classList.remove(allbuttons[i].classList[1]);
            allbuttons[i].classList.add(originalbuttons[i]);
        }
    }
}


// Chalange 5:Blackjack
let BlackjackGame = {
    'you':{'scorecap':'#your', 'div':'#yourbox', 'score':0},
    'dealer':{'scorecap':'#dealer', 'div':'#dealerbox', 'score':0},
    'cards':['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardMap':{'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1, 11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'hitStatus': false,
    'standStatus': false,
    'dealStatus': false,

}

const YOU = BlackjackGame['you']
const DEALER = BlackjackGame['dealer']

const hitaudio = new Audio('sounds/swish.m4a')
const winaudio = new Audio('sounds/cash.mp3')
const loseaudio = new Audio('sounds/aww.mp3')

document.querySelector("#hit-btn").addEventListener("click", bjhit)
document.querySelector("#stand-btn").addEventListener("click", bjstand)
document.querySelector("#deal-btn").addEventListener("click", bjdeal)

function bjhit(){
    if (BlackjackGame['hitStatus'] === false){
        if (YOU["score"] <= 21){
            BlackjackGame['standStatus'] = true
            let card = randomCard()
            showcard(card, YOU)
            hitaudio.play()
            score(card, YOU)
            displayScore(YOU)
        }
    }
}

function randomCard(){
    let randomcard = Math.floor(Math.random() * 13)
    return BlackjackGame["cards"][randomcard]
}

function showcard(card, player){
    let cardImage = document.createElement('img')
    cardImage.src = `images/${card}.png`
    document.querySelector(player['div']).appendChild(cardImage)
}

function bjdeal(){
    if (BlackjackGame['dealStatus'] === true){
        let yourImages = document.querySelector(YOU['div']).querySelectorAll('img')
        let dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img')

        for (i = 0; i < yourImages.length; i += 1){
            yourImages[i].remove()
        }

        for (i = 0; i < dealerImages.length; i += 1){
            dealerImages[i].remove()
        }

        YOU["score"] = 0
        document.querySelector(YOU["scorecap"]).textContent = 0
        document.querySelector(YOU["scorecap"]).style.color = "#fff"
        DEALER["score"] = 0
        document.querySelector(DEALER["scorecap"]).textContent = 0
        document.querySelector(DEALER["scorecap"]).style.color = "#fff"
        document.querySelector("#bj-status").textContent = "Let's play"
        document.querySelector("#bj-status").style.color = 'black'

        BlackjackGame['hitStatus'] = false
        BlackjackGame['standStatus'] = false
        BlackjackGame['dealStatus'] = false
    }
}

function score(card, player){
    if (card === "A"){
        if (player["score"] <= 10){
            player["score"] += 11
        }
        else {
            player["score"] += 1
        }
    }
    else{
        player["score"] += BlackjackGame["cardMap"][card]
    }
}

function displayScore(player){
    if (player["score"] > 21){
        document.querySelector(player["scorecap"]).textContent = "BUST!"
        document.querySelector(player["scorecap"]).style.color = "red"
    }
    else{
        document.querySelector(player["scorecap"]).textContent = player["score"]
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function bjstand(){
    if (BlackjackGame['standStatus'] === true){
        if (DEALER['score'] <= 21){
            while (DEALER['score'] <= 16){
                BlackjackGame['hitStatus'] = true
                let card = randomCard()
                showcard(card, DEALER)
                score(card, DEALER)
                displayScore(DEALER)
                hitaudio.play()
                await sleep(1000)
            }
            showWinner(bjlogic())
            BlackjackGame['dealStatus'] = true
        } 
    }
}

function bjlogic(){
    let winner
    if (YOU['score'] <=21){
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            winner = "You"
        } else if (YOU['score'] < DEALER['score']){
            winner = "Dealer"
        } else if (YOU['score'] === DEALER['score']){
            winner = "Draw"
        }
    } else if (YOU['score'] > 21 && DEALER['score'] < 21){
        winner = "Dealer"
    } else if (YOU['score'] > 21 && DEALER['score'] > 21){
        winner = "Draw"
    }
    console.log(winner, ", Dealer score = ", DEALER['score'], ", Your score = ", YOU['score'])
    return winner
}

function showWinner(winner){
    if (winner === "Draw"){
        BlackjackGame["draws"] += 1
        document.querySelector('#draws').textContent = BlackjackGame['draws']
        document.querySelector("#bj-status").textContent = "It is a Draw"
        document.querySelector("#bj-status").style.color = 'yellow'
    } else if (winner === "You"){
        BlackjackGame["wins"] += 1
        document.querySelector('#wins').textContent = BlackjackGame['wins']
        document.querySelector("#bj-status").textContent = "You Won !"
        document.querySelector("#bj-status").style.color = 'green'
        winaudio.play()
    } else if (winner === "Dealer") {
        BlackjackGame["losses"] += 1
        document.querySelector('#losses').textContent = BlackjackGame['losses']
        document.querySelector("#bj-status").textContent = "Dealer Won"
        document.querySelector("#bj-status").style.color = 'red'
        loseaudio.play()
    }
}
