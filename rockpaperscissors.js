//Sets the initial scores for computer & player
let computerScore = 0;  
let playerScore = 0;    
        
//Computer's choices
let choices = ['rock', 'paper', 'scissors']; 
        
//Allows the computer to choose a random move
function computerPlay() {          
    let computerSpin = Math.floor(Math.random()*3);
    if (computerSpin === 0) {
        return choices[0];
    } else if (computerSpin === 1) {
        return choices[1];
    } else {
        return choices[2];
    } 
}
        
//Variables for each round's selection
let playerSelection;
let computerSelection;
        
 
//Determines the winner of the round;
function playRound(playerSelection, computerSelection) {         
    playerSelection.toLowerCase();
    computerSelection = computerPlay(); 
    if (playerSelection === computerSelection) {
        return 'The round was a tie!';
    } else if (playerSelection === 'rock') {
        if (computerSelection === 'paper') {
            computerScore += 1;
            return 'You lose the round! Paper beats rock!';
        } else if (computerSelection === 'scissors') {
            playerScore += 1;
            return 'You win the round! Rock beats scissors!';
        }
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'rock') {
            playerScore += 1; 
            return 'You win the round! Paper beats rock!';
        } else if (computerSelection === 'scissors') {
            computerScore += 1;
            return 'You lose the round! Scissors beats paper!';
        }
    } else if (playerSelection === 'scissors') {
        if (computerSelection === 'rock') {
            computerScore += 1;
            return 'You lose the round! Rock beats scissors!';
        } else if (computerSelection === 'paper') {
            playerScore += 1; 
            return 'You win the round! Scissors beats paper!';
        }
    } else {
        return 'Invalid submission. Please enter rock, paper or scissors'; 
    }
}
        
        
//Creates the standings DOM element 
let standings = document.createElement('div');
standings.style.marginBottom = "0";

//Starts the game round
let gameRound = 0;

let buttons = document.querySelectorAll('button');

//Plays a round of the game and lists the score/result on the DOM
function game() {             
    let roundResult = playRound(playerSelection, computerSelection);
    let roundDisplay = document.createElement('div');
    roundDisplay.innerHTML = `Round ${gameRound}: ${roundResult}`;
    roundDisplay.className = 'round-score';
    document.querySelector('.container').appendChild(roundDisplay);
    standings.innerHTML = `Your score: ${playerScore} | Computer score: ${computerScore}`; 
    standings.className = 'bottom-score';
    document.querySelector('.score').appendChild(standings);
    if (gameRound === 5) {
        document.querySelector('.score').removeChild(standings);
        let gameResult = document.createElement('div');
        gameResult.style.fontWeight = '800';
        gameResult.className = 'bottom-score';
        gameResult.id = 'game-over';
        if (playerScore > computerScore) {
            gameResult.innerHTML = `You win, ${playerScore} to ${computerScore}`;
        } else if (computerScore > playerScore) {
            gameResult.innerHTML = `The computer wins, ${playerScore} to ${computerScore}`;
        } else {
            gameResult.innerHTML = 'It\'s a tie!'; 
        } 
        document.querySelector('.score').appendChild(gameResult); 
        playerScore = 0; 
        computerScore = 0; 
    } else {
        return; 
    }
} 


//Allows the user to start or reset a game by clicking the buttons 
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (gameRound === 5) {
            const reset = document.querySelector('.container');
            while (reset.firstChild) {
                reset.removeChild(reset.lastChild);
            }
            const reset2 = document.querySelector('.score')
            reset2.removeChild(reset2.lastChild);
            gameRound = 1; 
            game();
        } else { 
            gameRound++;
            playerSelection = e.target.className; //This line retrieves the class of the clicked button and passes it as the player's choice. 
            game();
        }
    });
});