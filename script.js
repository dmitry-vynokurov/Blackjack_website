// Chalange 5:Blackjack
let BlackjackGame = {
    'you':{'scorecap':'#your', 'div':'#yourbox', 'score':0},
    'dealer':{'scorecap':'#dealer', 'div':'#dealerbox', 'score':0},
    'cards':['2.1', '3.1', '4.1', '5.1', '6.1', '7.1', '8.1', '9.1', '10.1', 'K.1', 'J.1', 'Q.1', 'A.1', 
    '2.2', '3.2', '4.2', '5.2', '6.2', '7.2', '8.2', '9.2', '10.2', 'K.2', 'J.2', 'Q.2', 'A.2', 
    '2.3', '3.3', '4.3', '5.3', '6.3', '7.3', '8.3', '9.3', '10.3', 'K.3', 'J.3', 'Q.3', 'A.3', 
    '2.4', '3.4', '4.4', '5.4', '6.4', '7.4', '8.4', '9.4', '10.4', 'K.4', 'J.4', 'Q.4', 'A.4'],
    'cardMap':{'2.1':2, '3.1':3, '4.1':4, '5.1':5, '6.1':6, '7.1':7, '8.1':8, '9.1':9, '10.1':10, 'K.1':10, 'J.1':10, 'Q.1':10, 'A.1':[1, 11], 
    '2.2':2, '3.2':3, '4.2':4, '5.2':5, '6.2':6, '7.2':7, '8.2':8, '9.2':9, '10.2':10, 'K.2':10, 'J.2':10, 'Q.2':10, 'A.2':[1, 11], 
    '2.3':2, '3.3':3, '4.3':4, '5.3':5, '6.3':6, '7.3':7, '8.3':8, '9.3':9, '10.3':10, 'K.3':10, 'J.3':10, 'Q.3':10, 'A.3':[1, 11], 
    '2.4':2, '3.4':3, '4.4':4, '5.4':5, '6.4':6, '7.4':7, '8.4':8, '9.4':9, '10.4':10, 'K.4':10, 'J.4':10, 'Q.4':10, 'A.4':[1, 11]},
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

document.getElementById("year").innerHTML = new Date().getFullYear()

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
        document.querySelector("#rules").style.visibility = "hidden"
        rules_display = false
    }
}

function randomCard(){
    let randomcard = Math.floor(Math.random() * 52)
    return BlackjackGame["cards"][randomcard]
}

function showcard(card, player){
    let cardImage = document.createElement('img')
    cardImage.src = `images/${card}.jpg`
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
        document.querySelector("#bj-status").style.color = 'white'

        BlackjackGame['hitStatus'] = false
        BlackjackGame['standStatus'] = false
        BlackjackGame['dealStatus'] = false

        document.querySelector("#rules").style.visibility = "hidden"
        rules_display = false
    }
}

document.querySelector("#reset-score-btn").addEventListener("click", score_reset)
document.querySelector("#rules-btn").addEventListener("click", rules)

function score_reset(){
    BlackjackGame["draws"] = 0
    document.querySelector('#draws').textContent = BlackjackGame['draws']
    BlackjackGame["wins"] = 0
    document.querySelector('#wins').textContent = BlackjackGame['wins']
    BlackjackGame["losses"] = 0
    document.querySelector('#losses').textContent = BlackjackGame['losses']
}

let rules_display = false

function rules(){
    if (rules_display === false){
        document.querySelector("#rules").style.visibility = "visible"
        rules_display = true
    }
    else{
        document.querySelector("#rules").style.visibility = "hidden"
        rules_display = false
    }
}

function score(card, player){
    if (card === "A.1" || card === "A.2" || card === "A.3" || card === "A.4"){
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
    document.querySelector("#rules").style.visibility = "hidden"
    rules_display = false
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


