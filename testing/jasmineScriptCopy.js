/* ---------------------------------------------------------------------------------------------------------- */ 
/* -------------------------------- CONSTRUCTOR FUNCTION + PROTOTYPE METHODS -------------------------------- */ 
/* ---------------------------------------------------------------------------------------------------------- */ 

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
};

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
};

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
};

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
};
