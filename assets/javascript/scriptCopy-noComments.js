/* -------------------------------- VARIABLES -------------------------------- */ 
var mobileMenuIcon = document.querySelector('.topnav button.icon');
var startScreen = document.querySelector('#startScreen');
var gameScreen = document.querySelector('#gameScreen');
var modalInner = document.querySelector('.modal-inner');
var modalOuter = document.querySelector('.modal-outer');
var modalButtons = document.querySelectorAll('.modalButton');
var addPlayerList = document.querySelector('.addPlayer');
var list = document.querySelector('.playersAdded');
var playersList = [];
var startGameButton = document.querySelector('#startGameButton');
var diceHolders = Array.from(document.querySelectorAll('.diceHolder'));
var diceLockButtons = document.querySelectorAll('button[role="diceLock"]');
var rollDiceButton = document.querySelector('#rollDiceButton');
var saveDiceForm = document.querySelector('.saveRollResult');
var playerScoreColums = Array.from(document.querySelectorAll('[data-playerNumber]'));
var selectOptions = saveDiceForm.querySelectorAll('optgroup > option');
var diceResultArray = [];
var roundTurn = 1;
var rollTurn = 1;
var currentPlayer = 0;
var playerInstanceArray = [];
/* -------------------------------- CONSTRUCTOR FUNCTION + PROTOTYPE METHODS -------------------------------- */
function Player(name) {
    this.name = name;
    this.usedScoreCategories = [];
    this.aces = null;
    this.twos = null;
    this.threes = null;
    this.fours = null;
    this.fives = null;
    this.sixes = null;
    this.onePair = null;
    this.twoPair = null;
    this.threeOfAKind = null;
    this.fourOfAKind = null;
    this.smallStraight = null;
    this.largeStraight = null;
    this.fullHouse = null;
    this.yahtzee = null;
    this.chance = null;
}
Player.prototype.calculateScore = function(scoreCategory) {
    if( typeof(scoreCategory) !== 'string' ) {
        throw new Error('scoreCategory is not a string');
    } else if(!scoreCategory.match(/(aces|twos|threes|fours|fives|sixes|onePair|twoPair|threeOfAKind|fourOfAKind|smallStraight|largeStraight|fullHouse|yahtzee|chance)/g)) {
        throw new Error('not a valid score category!');
    } 
    else if( RegExp('[0a-zA-Z7-9]').test( this[scoreCategory].join('') ) ) {
        throw new Error('scoreArray contains invalid numbers');
    }
    const integerTally = this[ scoreCategory ].reduce((tally, arrayItem) => {
        tally[arrayItem] = (tally[arrayItem] || 0) + 1;
        return tally;
    }, {});
    switch ( scoreCategory.toString() ) {
        case 'aces':
            return this.aces.reduce( (accumulator, arrayItem) => {
                if(arrayItem === 1) {
                    return accumulator + arrayItem;
                } else {
                    return accumulator + 0;
                }
            }, 0);
            break;              
        case 'twos':
            return this.twos.reduce( (accumulator, arrayItem) => {
                if(arrayItem === 2) {
                    return accumulator + arrayItem;
                } else {
                    return accumulator + 0;
                }
            }, 0);
            break;                
        case 'threes':
            return this.threes.reduce( (accumulator, arrayItem) => {
                if(arrayItem === 3) {
                    return accumulator + arrayItem;
                } else {
                    return accumulator + 0;
                }
            }, 0);
            break;
        case 'fours':
            return this.fours.reduce( (accumulator, arrayItem) => {
                if(arrayItem === 4) {
                    return accumulator + arrayItem;
                } else {
                    return accumulator + 0;
                }
            }, 0);
            break;
        case 'fives':
            return this.fives.reduce( (accumulator, arrayItem) => {
                if(arrayItem === 5) {
                    return accumulator + arrayItem;
                } else {
                    return accumulator + 0;
                }
            }, 0);
            break;
        case 'sixes':
            return this.sixes.reduce( (accumulator, arrayItem) => {
                if(arrayItem === 6) {
                    return accumulator + arrayItem;
                } else {
                    return accumulator + 0;
                }
            }, 0);
            break;
        case 'onePair': 
            if( Object.values( integerTally ).some( arrayItem => arrayItem >= 2 ) ) {
                const pairsArray = Object.entries(integerTally).filter( arrayItem => arrayItem[1] >= 2 );
                return pairsArray.map( arrayItem => parseInt(arrayItem[0])).reduce( (accumulator, arrayItem) => {return Math.max(accumulator, arrayItem)} ) * 2;
            } else {
                return 0;
            }
            break;       
        case 'twoPair':
            const pairsArray = Object.entries(integerTally).filter( arrayItem => arrayItem[1] >= 2 ).map( arrayItems => parseInt(arrayItems[0]));
            if(pairsArray.length === 2) {
                return (pairsArray[0] * 2) + (pairsArray[1] * 2);
            } else {
                return 0;
            }
            break;
        case 'threeOfAKind':
            if( Object.values( integerTally ).some( arrayItem => arrayItem >= 3 ) ) {
                const toakIndex = Object.values(integerTally).findIndex( arrayItem => arrayItem >= 3 );
                return 3 * parseInt( Object.keys(integerTally)[ toakIndex ] );
            } else {
                return 0;
            }
            break;
        case 'fourOfAKind':
            if( Object.values( integerTally ).some( arrayItem => arrayItem >= 4 ) ) {
                const toakIndex = Object.values(integerTally).findIndex( arrayItem => arrayItem >= 4 );
                return 4 * parseInt( Object.keys(integerTally)[ toakIndex ] );
            } else {
                return 0;
            }
            break;
        case 'smallStraight':
            if( [...this.smallStraight].sort().join('') === '12345' ) {
                return 15;
            } else {
                return 0;
            }
            break;
        case 'largeStraight':
            if( [...this.largeStraight].sort().join('') === '23456' ) {
                return 20;
            } else {
                return 0;
            }
            break;
        case 'fullHouse':
            if( Object.values( integerTally ).some( arrayItem => arrayItem === 2 ) && Object.values( integerTally ).some( arrayItem => arrayItem === 3 ) ) {
                return this.fullHouse.reduce( (accumulator, arrayItem) => accumulator + arrayItem );
            } else {
                return 0;
            }
            break;
        case 'yahtzee':
            if( this.yahtzee.every((arrayItem, index, array) => arrayItem === array[0]) ) {
                return 50;
            } else {
                return 0;
            }
            break;
        case 'chance':
            return this.chance.reduce( (accumulator, arrayItem) => accumulator + arrayItem );
            break;
        default:
            console.log('calculateScore SWITCH statement was executed, but no matching "case" was found');
            break;
    }
}
Player.prototype.totalScore = function() {
    const filledScores = Object.entries( this ).filter( arrayItem => {
        if( arrayItem[0] === 'name' || arrayItem[0] === 'usedScoreCategories' ) {
            return false;
        } else if (arrayItem[1] === null){
            return false;
        } else {
            return true;
        }
    });
    if(filledScores.length === 0) { return 0; }
    return filledScores.map( arrayItem => this.calculateScore(arrayItem[0]) ).reduce( (accumulator, arrayItem) => accumulator + arrayItem ) + (this.upperScore() >= 63 ? 50 : 0);
}
Player.prototype.upperScore = function() {
    const filledScores = Object.entries( this ).filter( arrayItem => {
        if( !arrayItem[0].match(/(aces|twos|threes|fours|fives|sixes)/g)  ) {
            return false;
        } else if (arrayItem[1] === null){
            return false;
        } else {
            return true;
        }
    });
    if(filledScores.length === 0) { return 0; }
    return filledScores.map( arrayItem => this.calculateScore(arrayItem[0]) ).reduce( (accumulator, arrayItem) => accumulator + arrayItem );
}
/* ---------------------- Function Definitions ---------------------- */
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
}
function openModal(event) {
    toggleMobileMenu();
    modalOuter.classList.add('open');
    modalInner.querySelectorAll(`.modal-inner > div`).forEach(div => div.setAttribute('style', 'display:none;'));
    const buttonRole = event.currentTarget.getAttribute('role');
    modalInner.querySelector(`div[role=${buttonRole}]`).setAttribute('style', 'display: block;');
    modalOuter.addEventListener('click', closeModal);
    closeModalIcon.addEventListener('click', closeModal);
    window.addEventListener('keydown', closeModal);
    if(buttonRole === 'startPlaying') {
        addPlayerList.addEventListener('submit', handleAddPlayerSubmit);
        list.addEventListener('playersUpdated', displayPlayer); 
        list.addEventListener('click', deletePlayer);
    }
}
function closeModal(event) {
    if(event.key === 'Escape' || event.target.className.includes('modal-outer') || event.currentTarget === closeModalIcon) {
        modalOuter.classList.remove('open');
        modalOuter.removeEventListener('click', closeModal);
        closeModalIcon.removeEventListener('click', closeModal);
        window.removeEventListener('keydown', closeModal);
        addPlayerList.removeEventListener('submit', handleAddPlayerSubmit);
        list.removeEventListener('playersUpdated', displayPlayer); 
        list.removeEventListener('click', deletePlayer);
    }
}
function handleAddPlayerSubmit(e) {
    e.preventDefault();
    if(playersList.length >= 6) {
        alert('Max 6 players allowed!');
        return;
    }
    const name = e.currentTarget.playerName.value;
    if(!name) {return};
    const player = {
        name: name,
        id: Date.now(),
    }
    playersList.push(player);
    e.target.reset(); 
    list.dispatchEvent(new CustomEvent('playersUpdated'));
    if( list.querySelectorAll('li').length === 2) {
        startGameButton.setAttribute('style', 'display: block;');
        startGameButton.addEventListener('click', startGame);
    };
}

function displayPlayer() {
    const html = playersList.map(player => { 
        return `<li class="player"> 
            <span class="playerName">${player.name}</span>
            <button aria-label="Remove ${player.name}" value="${player.id}">&times;</button>
        </li>`;
    }).join('');
    list.innerHTML = html;
}

function deletePlayer(event) {
    const id = parseInt(event.target.value);
    playersList = playersList.filter(player => player.id !== id);
    list.dispatchEvent(new CustomEvent('playersUpdated'));
    if( list.querySelectorAll('li').length < 2) {
        startGameButton.setAttribute('style', 'display: none;');
        startGameButton.removeEventListener('click', startGame);
    };
}
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
}
function startGame() {
    modalOuter.classList.remove('open');
    modalOuter.removeEventListener('click', closeModal);
    closeModalIcon.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModal);
    rollDiceButton.addEventListener('click', handleRollDice);
    diceLockButtons.forEach( button => button.addEventListener('click', handleDiceLock));
    saveDiceForm.addEventListener('submit', handleSaveDiceSubmit);
    saveDiceForm.addEventListener('diceResultSaved', resetGameArea);
    gameScreen.addEventListener('gameEnd', handleGameEnd)
    startScreen.setAttribute('style','display: none;');
    gameScreen.setAttribute('style','display: block;');
    const playersToAdd = list.querySelectorAll('li');
    playersToAdd.forEach( player => {
        const playerName = player.querySelector('.playerName').textContent;
        playerInstanceArray.push( new Player( playerName ) );
    } );
    document.querySelector('#playerTurnText').textContent = `${playerInstanceArray[ currentPlayer ].name}'s turn`;
    playerScoreColums.forEach(column => {
        if(parseInt(column.dataset.playernumber) >= playerInstanceArray.length) {
            column.setAttribute('style', 'display: none;');
            return;
        }
        column.querySelector('div[role="playerName"]').textContent = playerInstanceArray[ parseInt(column.dataset.playernumber) ].name;
    });
    document.querySelector('.topnav #navEndGameButton').setAttribute('style', 'display: inline-block;');
    document.querySelector('.topnav #navStartGameButton').setAttribute('style', 'display: none;');

    document.querySelector('.topnav #navEndGameButton').addEventListener('click', () => {
        if ( confirm("Are you sure you want to end the game? You will lose all your progress if you do.") ) {
            document.location.reload(true);
        } else {
            return;
        }
    });
}
function handleRollDice(event) {
    if(rollTurn === 1) {
        diceLockButtons.forEach( button => {
            button.removeAttribute('disabled');
        });
        document.querySelector('#saveRollResultButton').removeAttribute('disabled');
    }
    rollDiceButton.removeEventListener('click', handleRollDice);
    if(rollTurn < 3) {
        setTimeout(function() {
            rollDiceButton.addEventListener('click', handleRollDice);
        }, 1500);
    } else {
        rollDiceButton.addEventListener('click', handleRollDice);
        rollDiceButton.setAttribute('disabled', 'true');
    }
    rollTurn += 1;
    let rollArray = [];
    diceHolders.forEach( diceHolder => {
        if(diceHolder.dataset.locked === 'true') { return; } 
        diceHolder.innerHTML = '';
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        rollArray.push([diceHolder, diceRoll]);
    } );
    for(let i = 1; i < rollArray.length + 1; i++) {
        setTimeout(function() {
        rollArray[i - 1][0].innerHTML = `<img src="./assets/media/images/dice${rollArray[i - 1][1]}.png" alt="${rollArray[i - 1][1]}">`
        }, 750 * i);
    }
    document.querySelector('#throwsLeftText').textContent = `${4 - rollTurn} roll${ (4-rollTurn === 1 ? '' : 's' ) } left`;
}
function handleDiceLock(event) {
    const diceSlot = event.currentTarget.dataset.diceslot;         
    const matchingDiceHolder = diceHolders.find(element => element.dataset.diceslot === diceSlot );
    if(matchingDiceHolder.dataset.locked === 'true') {
        matchingDiceHolder.setAttribute('data-locked', 'false');
        event.currentTarget.setAttribute('data-locked', 'false');
        event.currentTarget.textContent = 'Lock';
    } else {
        matchingDiceHolder.setAttribute('data-locked', 'true');
        event.currentTarget.setAttribute('data-locked', 'true');
        event.currentTarget.textContent = 'Unlock';
    }
}
function handleSaveDiceSubmit(event) {
    event.preventDefault();
    if(event.currentTarget.scoreSectionSelect.value === '--- Select Option ---') {
        alert('Not a valid category. Please pick another.');
        return;
    }
    const chosenCategory = event.currentTarget.scoreSectionSelect.value;
    diceResultArray = [];
    diceHolders.forEach( (diceHolder, index) => {
        if( !diceHolder.querySelector('img') ) {
            throw new Error(`Dice slot number ${index + 1} is empty.`);
        }
        const diceValue = parseInt(diceHolder.querySelector('img').alt);
        diceResultArray.push(diceValue);
    });
    if(!playerInstanceArray[ currentPlayer ][ chosenCategory ] === null) {
        alert('This scoreCategory has already been filled. Please choose another!');
        return;
    }
    playerInstanceArray[ currentPlayer ][ chosenCategory ] = diceResultArray;
    const divToUpdate = document.querySelector(`div[data-playerNumber="${currentPlayer}"]`).querySelector(`div[role="${chosenCategory}"]`); 
    const score = playerInstanceArray[ currentPlayer ].calculateScore( chosenCategory ); 
    divToUpdate.textContent = score;
    const upperScoreCell = document.querySelector(`div[data-playerNumber="${currentPlayer}"]`).querySelector(`div[role="upperSum"]`);
    const upperBonusCell = document.querySelector(`div[data-playerNumber="${currentPlayer}"]`).querySelector(`div[role="upperBonus"]`);
    const totalScoreCell = document.querySelector(`div[data-playerNumber="${currentPlayer}"]`).querySelector(`div[role="totalScore"]`);
    upperScoreCell.textContent = playerInstanceArray[ currentPlayer ].upperScore(); // upperScore
    upperBonusCell.textContent = (playerInstanceArray[ currentPlayer ].upperScore() >= 63 ? 50 : 0); // upperBonus
    totalScoreCell.textContent = playerInstanceArray[ currentPlayer ].totalScore(); // totalScore
    playerInstanceArray[ currentPlayer ].usedScoreCategories.push( chosenCategory );
     if(currentPlayer === playerInstanceArray.length - 1) {
        currentPlayer = 0;
        roundTurn += 1;
        document.querySelector('#roundCounter').textContent = `Round ${roundTurn} of 15`;
        if(roundTurn === 16) {
            gameScreen.dispatchEvent(new CustomEvent('gameEnd'));
            return;
        }
    } else {
        currentPlayer += 1;
    }
    saveDiceForm.dispatchEvent(new CustomEvent('diceResultSaved'));
}
function resetGameArea() {
    document.getElementById("scoreSectionSelect").selectedIndex = 0;
    selectOptions.forEach( option =>  {
        if(playerInstanceArray[ currentPlayer ].usedScoreCategories.find( arrayItem => arrayItem === option.value )) {
            option.setAttribute('disabled', 'true');
        } else {
            option.removeAttribute('disabled');
        }
    });
    rollTurn = 1;
    rollDiceButton.removeAttribute('disabled');
    diceHolders.forEach( (diceHolder) => {
        diceHolder.innerHTML = '';
        diceHolder.setAttribute('data-locked', 'false');
    });
    diceLockButtons.forEach( button => {
        button.setAttribute('data-locked', 'false');
        button.textContent = 'Lock';
        button.setAttribute('disabled', 'true');
    });
    document.querySelector('#saveRollResultButton').setAttribute('disabled', 'true');
    document.querySelector('#throwsLeftText').textContent = '3 throws left';
    document.querySelector('#playerTurnText').textContent = `${playerInstanceArray[ currentPlayer ].name}'s turn`;
    document.querySelector(`[data-playernumber="${currentPlayer}"]`).setAttribute('data-currentplayer','true');
    document.querySelector(`[data-playernumber="${ currentPlayer === 0 ? playerInstanceArray.length - 1 : currentPlayer - 1 }"]`).setAttribute('data-currentplayer','false');

}

function handleGameEnd() {
    const winner = playerInstanceArray.reduce(function(prev, current) {
        return ( prev.totalScore() > current.totalScore() ) ? prev : current
    });
    document.querySelector('#roundCounter').textContent = `Game over. ${winner.name} wins!`;
    rollDiceButton.setAttribute('disabled', 'true');
    document.querySelector('#saveRollResultButton').setAttribute('disabled', 'true');
    document.querySelectorAll('.playerCol').forEach( playerCol => {
        console.log(playerCol);
        playerCol.removeAttribute('data-currentplayer');
    });
}
/* -------------------------------------------- Event Listeners -------------------------------------------- */
mobileMenuIcon.addEventListener('click', toggleMobileMenu);
modalButtons.forEach(button => button.addEventListener('click', openModal));