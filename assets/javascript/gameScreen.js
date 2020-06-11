console.log('It works!');

/* ---------------------- Variables ---------------------- */

// Top Navigation
const mobileMenuIcon = document.querySelector('.topnav button.icon');

// GameScreen Variables
const diceHolders = Array.from(document.querySelectorAll('.diceHolder'));
const diceLockButtons = document.querySelectorAll('button[role="diceLock"]');
const rollDiceButton = document.querySelector('#rollDiceButton');
const saveDiceForm = document.querySelector('.saveRollResult');
const playerScoreColums = Array.from(document.querySelectorAll('[data-playerNumber]'));
const selectOptions = saveDiceForm.querySelectorAll('optgroup > option');
let diceResultArray = [];

// GameScreen States
let roundTurn = 1;
let rollTurn = 1;
let currentPlayer = 0;
let playerInstanceArray = [];

/* -------------------------------- CONSTRUCTOR FUNCTION + PROTOTYPE METHODS -------------------------------- */ 

// ------------------------------ Player Constructor ------------------------------
function Player(name) {
    this.name = name;
    this.usedScoreCategories = [];
    // Properties for storing scoreResults
    //Part 1
    this.aces = null;
    this.twos = null;
    this.threes = null;
    this.fours = null;
    this.fives = null;
    this.sixes = null;
    //Part 2
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

        // ------------------------------ Calculate scoreCategory score method ------------------------------
        Player.prototype.calculateScore = function(scoreCategory) {
            // Input checks
            if( typeof(scoreCategory) !== 'string' ) {
                throw new Error('scoreCategory is not a string');
            } else if(!scoreCategory.match(/(aces|twos|threes|fours|fives|sixes|onePair|twoPair|threeOfAKind|fourOfAKind|smallStraight|largeStraight|fullHouse|yahtzee|chance)/g)) {
                throw new Error('not a valid score category!');
            } 
            else if( RegExp('[0a-zA-Z7-9]').test( this[scoreCategory].join('') ) ) {
                throw new Error('scoreArray contains invalid numbers');
            }

            // Integer Tally Function (needed for some score calculations below)
            const integerTally = this[ scoreCategory ].reduce((tally, arrayItem) => {
                    tally[arrayItem] = (tally[arrayItem] || 0) + 1;
                    return tally;
            }, {});
            
            // 'SWITCH' stament with calculations for all scoreCategories
            switch ( scoreCategory.toString() ) {
                // ------------> Dice Value Scores
                case 'aces':
                    return this.aces.reduce( (accumulator, arrayItem) => {
                        if(arrayItem === 1) {
                            return accumulator + arrayItem
                        } else {
                            return accumulator + 0
                        }
                    }, 0);
                    break;
                
                case 'twos':
                    return this.twos.reduce( (accumulator, arrayItem) => {
                        if(arrayItem === 2) {
                            return accumulator + arrayItem
                        } else {
                            return accumulator + 0
                        }
                    }, 0);
                    break;
                
                case 'threes':
                    return this.threes.reduce( (accumulator, arrayItem) => {
                        if(arrayItem === 3) {
                            return accumulator + arrayItem
                        } else {
                            return accumulator + 0
                        }
                    }, 0);
                    break;

                case 'fours':
                    return this.fours.reduce( (accumulator, arrayItem) => {
                        if(arrayItem === 4) {
                            return accumulator + arrayItem
                        } else {
                            return accumulator + 0
                        }
                    }, 0);
                    break;

                case 'fives':
                    return this.fives.reduce( (accumulator, arrayItem) => {
                        if(arrayItem === 5) {
                            return accumulator + arrayItem
                        } else {
                            return accumulator + 0
                        }
                    }, 0);
                    break;

                case 'sixes':
                    return this.sixes.reduce( (accumulator, arrayItem) => {
                        if(arrayItem === 6) {
                            return accumulator + arrayItem
                        } else {
                            return accumulator + 0
                        }
                    }, 0);
                    break;
                
                // ------------> Poker Scores

                case 'onePair': // <------ !!! 3-5 values possible !!!
                    if( Object.values( integerTally ).some( arrayItem => arrayItem >= 2 ) ) {
                            const pairsArray = Object.entries(integerTally).filter( arrayItem => arrayItem[1] >= 2 );
                            return pairsArray.map( arrayItem => parseInt(arrayItem[0])).reduce( (accumulator, arrayItem) => {return Math.max(accumulator, arrayItem)} ) * 2;
                        } else {
                            return 0;
                    }
                    break;
                
                case 'twoPair': // <------ !!! 3-5 values possible !!!
                    const pairsArray = Object.entries(integerTally).filter( arrayItem => arrayItem[1] >= 2 ).map( arrayItems => parseInt(arrayItems[0]));
                    if(pairsArray.length === 2) {
                        return (pairsArray[0] * 2) + (pairsArray[1] * 2);
                    } else {
                        return 0;
                    }
                    break;
                
                case 'threeOfAKind': // <------ !!! 4-5 values possible !!!
                    if( Object.values( integerTally ).some( arrayItem => arrayItem >= 3 ) ) {

                        const toakIndex = Object.values(integerTally).findIndex( arrayItem => arrayItem >= 3 );
                        return 3 * parseInt( Object.keys(integerTally)[ toakIndex ] );
                        
                    } else {
                        return 0;
                    }
                    break;
                
                case 'fourOfAKind': // <------ !!! 5 values possible !!!
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

                // ------------> Default
                default:
                    console.log('calculateScore SWITCH statement was executed, but no matching "case" was found');
                    break;
            }
        }


        // ------------------------------ Calculate totalScore method ------------------------------
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
            if(filledScores.length === 0) {
                return 0;
            }
            return filledScores.map( arrayItem => this.calculateScore(arrayItem[0]) ).reduce( (accumulator, arrayItem) => accumulator + arrayItem ) + (this.upperScore() >= 63 ? 50 : 0);
        }

        // ------------------------------ Calculate upperScore method------------------------------
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
            if(filledScores.length === 0) {
                return 0;
            }
            return filledScores.map( arrayItem => this.calculateScore(arrayItem[0]) ).reduce( (accumulator, arrayItem) => accumulator + arrayItem );
        }


/* ---------------------- Function Definitions ---------------------- */

// ----------------> Top Navigation Functions
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
}

// ------------------------------ Start Game Function (aka set up #gameScreen) ------------------------------
function startGame() {

    // Populate playerInstanceArray
    playerInstanceArray = [ new Player('Player 0'), new Player('Player 1'), new Player('Player 2'), new Player('Player 3'),new Player('Player 4'), new Player('Player 5')];

    // Set initial playerTurnText
    document.querySelector('#playerTurnText').textContent = `${playerInstanceArray[ currentPlayer ].name}'s turn`;
    
    // Remove non-needed scoreColumns + add playerName to scoreColumn header
    playerScoreColums.forEach(column => {
        // display: none; column if playerInstance not in playerInstanceArray
        if(parseInt(column.dataset.playernumber) >= playerInstanceArray.length) {
            column.setAttribute('style', 'display: none;');
            return;
        }
        // Add playerInstance.name to each respective players scoreColumn header
        column.querySelector('div[role="playerName"]').textContent = playerInstanceArray[ parseInt(column.dataset.playernumber) ].name;
    });

}
startGame() //<---------------------------------------

// ------------------------------ Roll Dice Function ------------------------------
function handleRollDice(event) {
    if(rollTurn === 1) {
        diceLockButtons.forEach( button => {
            button.removeAttribute('disabled');
        });
        document.querySelector('#saveRollResultButton').removeAttribute('disabled');
    }
    if(rollTurn === 3) {
        rollDiceButton.setAttribute('disabled', 'true');
    }
    // Increment rollTurn state
    rollTurn += 1;
    // Create rollArray
    let rollArray = [];
    // Roll dice
    diceHolders.forEach( diceHolder => {
        // 1) Identify all non-locked in dice slots
        if(diceHolder.dataset.locked === 'true') {
            return;
        } 
        // 2) Empty all non-locked in dice slots
        diceHolder.innerHTML = '';
        // 3) Roll dice: Return a random number between 1 and 6
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        rollArray.push([diceHolder, diceRoll]);
    } );
    // Run a FOR loop to slow down the placing of rollDice results on page ('i = 1' to slow down presentation of 1st result)
    for(let i = 1; i < rollArray.length + 1; i++) {
        setTimeout(function() {
        rollArray[i - 1][0].innerHTML = `<img src="./assets/media/images/dice${rollArray[i - 1][1]}.png" alt="${rollArray[i - 1][1]}">`
        }, 750 * i);
    }
    // Update 'X throws left' text
    document.querySelector('#throwsLeftText').textContent = `${4 - rollTurn} roll${ (4-rollTurn === 1 ? '' : 's' ) } left`;
}

// ------------------------------ Dice Lock Function ------------------------------
function handleDiceLock(event) {
    // Store the 'diceslot' attribute value of the clicked button
    const diceSlot = event.currentTarget.dataset.diceslot;
    // Find + store diceHolder with matching 'diceslot' attribute value            
    const matchingDiceHolder = diceHolders.find(element => element.dataset.diceslot === diceSlot );
    // Change 'locked' attribute to 'true'/'false'
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

// ------------------------------ Save Round Result Function ------------------------------
function handleSaveDiceSubmit(event) {
    event.preventDefault();
    // If no valid options is chosen, send alert()

    /* ----------------- Security check ----------------- */
    if(event.currentTarget.scoreSectionSelect.value === '--- Select Option ---') {
        alert('Not a valid category. Please pick another.');
        return;
    }

    /* ----------------- Save Dice Results ----------------- */

    // Store the chosen scoreCategory
    const chosenCategory = event.currentTarget.scoreSectionSelect.value;

    // Clear diceResultArray of previous players saved result
    diceResultArray = [];
    
    // Store the dice values in the diceResultArray
    diceHolders.forEach( (diceHolder, index) => {
        // Check if any diceSlots are empty
        if( !diceHolder.querySelector('img') ) {
            throw new Error(`Dice slot number ${index + 1} is empty.`);
        }
        const diceValue = parseInt(diceHolder.querySelector('img').alt);
        // Send results into diceResultArray (could also use .splice() along w. the 'index' param...)
        diceResultArray.push(diceValue);
    });
    // Check chosenCategory is actually empty
    if(!playerInstanceArray[ currentPlayer ][ chosenCategory ] === null) {
        alert('This scoreCategory has already been filled. Please choose another!');
        return;
    }
    // Set chosenCategory (aka playerInstance property) to diceResultArray
    playerInstanceArray[ currentPlayer ][ chosenCategory ] = diceResultArray;

    /* ----------------- Update Score Area ----------------- */

    // Identify DIV to place score in:
    const divToUpdate = document.querySelector(`div[data-playerNumber="${currentPlayer}"]`).querySelector(`div[role="${chosenCategory}"]`);
    
    // Calculate score
    const score = playerInstanceArray[ currentPlayer ].calculateScore( chosenCategory );

    // Place score in correct DIV
    divToUpdate.textContent = score;

    // Update totalScore + upperSum + upperBonus
    const upperScoreCell = document.querySelector(`div[data-playerNumber="${currentPlayer}"]`).querySelector(`div[role="upperSum"]`);
    const upperBonusCell = document.querySelector(`div[data-playerNumber="${currentPlayer}"]`).querySelector(`div[role="upperBonus"]`);
    const totalScoreCell = document.querySelector(`div[data-playerNumber="${currentPlayer}"]`).querySelector(`div[role="totalScore"]`);

    upperScoreCell.textContent = playerInstanceArray[ currentPlayer ].upperScore(); // upperScore
    upperBonusCell.textContent = (playerInstanceArray[ currentPlayer ].upperScore() >= 63 ? 50 : 0); // upperBonus
    totalScoreCell.textContent = playerInstanceArray[ currentPlayer ].totalScore(); // totalScore

    
    /* ----------------- Remove <select> options for Player that have already been used... ----------------- */
    
    // Push chosenCategory (aka the used category) into playerInstance.usedScoreCategories array
    playerInstanceArray[ currentPlayer ].usedScoreCategories.push( chosenCategory );
    

    /* ----------------- CurrentPlayer ----------------- */

     // Increment CurrentPlayer state
     if(currentPlayer === playerInstanceArray.length - 1) {
        currentPlayer = 0;
        // Update roundCounter header (needs to be done right as currentPlayer is updated...)
        roundTurn += 1;
        document.querySelector('#roundCounter').textContent = `Round ${roundTurn} of 15`;
    } else {
        currentPlayer += 1;
    }

    // Fire off custom event for resetGameArea function
    saveDiceForm.dispatchEvent(new CustomEvent('diceResultSaved'));

}

// ------------------------------ Reset Gamescreen for Next Player Function ------------------------------
function resetGameArea() {
    // Reset dropwdown menu to "Select Option"
    document.getElementById("scoreSectionSelect").selectedIndex = 0;

    // Remove selectOptions already used by currentPlayer
    selectOptions.forEach( option =>  {
        if(playerInstanceArray[ currentPlayer ].usedScoreCategories.find( arrayItem => arrayItem === option.value )) {
            option.setAttribute('disabled', 'true');
        } else {
            // Make sure all OTHER selectOptions are not disabled
            option.removeAttribute('disabled');
        }
    });

    // Reset rollTurn to 1 + Un-disable rollDice button
    rollTurn = 1;
    rollDiceButton.removeAttribute('disabled');

    // Clear the diceHolders of their images + set data-locked to 'false'
    diceHolders.forEach( (diceHolder) => {
        diceHolder.innerHTML = '';
        diceHolder.setAttribute('data-locked', 'false');
    });

    // Unselect diceLock buttons + disable them
    diceLockButtons.forEach( button => {
        button.setAttribute('data-locked', 'false');
        button.textContent = 'Lock';
        button.setAttribute('disabled', 'true');
    });

    // Disable 'Save Result' button until after 1st rollDice
    document.querySelector('#saveRollResultButton').setAttribute('disabled', 'true');

    // Reset 'X throws left' text
    document.querySelector('#throwsLeftText').textContent = '3 throws left';

    // Update playerTurnText
    document.querySelector('#playerTurnText').textContent = `${playerInstanceArray[ currentPlayer ].name}'s turn`;

    // Update currentPlayer scoreColumn
    document.querySelector(`[data-playernumber="${currentPlayer}"]`).setAttribute('data-currentplayer','true');
    document.querySelector(`[data-playernumber="${ currentPlayer === 0 ? playerInstanceArray.length - 1 : currentPlayer - 1 }"]`).setAttribute('data-currentplayer','false');

}


/* ---------------------- Event Listeners ---------------------- */

// ----------------> Top Navigation
mobileMenuIcon.addEventListener('click', toggleMobileMenu);

// GameScreen event listeners
rollDiceButton.addEventListener('click', handleRollDice);
        diceLockButtons.forEach( button => button.addEventListener('click', handleDiceLock));
        saveDiceForm.addEventListener('submit', handleSaveDiceSubmit);
        saveDiceForm.addEventListener('diceResultSaved', resetGameArea);



