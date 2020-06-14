
// -------------------- Player.prototype.calculateScore() --------------------

describe("calculateScoreMethod", function() {

    const testPlayer = new Player('name1');

    describe("calculateScore( 'aces' )", function() {
        // aces
        it("should return 5", function() {
            testPlayer.aces = [1,1,1,1,1];
            expect( testPlayer.calculateScore('aces') ).toBe(5);
        });
        it("should return 2", function() {
            testPlayer.aces = [2,3,5,1,1];
            expect( testPlayer.calculateScore('aces') ).toBe(2);
        });
        it("should return 0", function() {
            testPlayer.aces = [2,3,5,4,6];
            expect( testPlayer.calculateScore('aces') ).toBe(0);
        });
    });

    describe("calculateScore( 'twos' )", function() {
        // twos
        it("should return 4", function() {
            testPlayer.twos = [2,6,2,1,4];
            expect( testPlayer.calculateScore('twos') ).toBe(4);
        });
        it("should return 0", function() {
            testPlayer.twos = [6,3,5,1,1];
            expect( testPlayer.calculateScore('twos') ).toBe(0);
        });
        it("should return 6", function() {
            testPlayer.twos = [2,3,5,2,2];
            expect( testPlayer.calculateScore('twos') ).toBe(6);
        });
    });

    describe("calculateScore( 'threes' )", function() {
        // threes
        it("should return 0", function() {
            testPlayer.threes = [2,6,2,1,4];
            expect( testPlayer.calculateScore('threes') ).toBe(0);
        });
        it("should return 3", function() {
            testPlayer.threes = [6,3,5,1,1];
            expect( testPlayer.calculateScore('threes') ).toBe(3);
        });
        it("should return 9", function() {
            testPlayer.threes = [3,3,5,3,6];
            expect( testPlayer.calculateScore('threes') ).toBe(9);
        });
    });

    describe("calculateScore( 'fours' )", function() {
        // fours
        it("should return 4", function() {
            testPlayer.fours = [2,6,2,1,4];
            expect( testPlayer.calculateScore('fours') ).toBe(4);
        });
        it("should return 0", function() {
            testPlayer.fours = [6,3,5,1,1];
            expect( testPlayer.calculateScore('fours') ).toBe(0);
        });
        it("should return 12", function() {
            testPlayer.fours = [4,4,5,3,4];
            expect( testPlayer.calculateScore('fours') ).toBe(12);
        });
    });

    describe("calculateScore( 'fives' )", function() {
        // fives
        it("should return 10", function() {
            testPlayer.fives = [5,6,5,1,4];
            expect( testPlayer.calculateScore('fives') ).toBe(10);
        });
        it("should return 0", function() {
            testPlayer.fives = [6,3,4,1,1];
            expect( testPlayer.calculateScore('fives') ).toBe(0);
        });
        it("should return 20", function() {
            testPlayer.fives = [5,5,5,3,5];
            expect( testPlayer.calculateScore('fives') ).toBe(20);
        });
    });

    describe("calculateScore( 'sixes' )", function() {
        // sixes
        it("should return 6", function() {
            testPlayer.sixes = [5,6,5,1,4];
            expect( testPlayer.calculateScore('sixes') ).toBe(6);
        });
        it("should return 0", function() {
            testPlayer.sixes = [5,3,4,1,1];
            expect( testPlayer.calculateScore('sixes') ).toBe(0);
        });
        it("should return 24", function() {
            testPlayer.sixes = [6,2,6,6,6];
            expect( testPlayer.calculateScore('sixes') ).toBe(24);
        });
    });


    describe("calculateScore( 'onePair' )", function() {
        // onePair
        it("should return 10", function() {
            testPlayer.onePair = [5,6,5,1,4];
            expect( testPlayer.calculateScore('onePair') ).toBe(10);
        });
        it("should return 0", function() {
            testPlayer.onePair = [5,3,4,1,6];
            expect( testPlayer.calculateScore('onePair') ).toBe(0);
        });
        it("should return 12", function() {
            testPlayer.onePair = [6,2,6,6,6];
            expect( testPlayer.calculateScore('onePair') ).toBe(12);
        });
        it("should return 12", function() {
            testPlayer.onePair = [4,2,6,4,6];
            expect( testPlayer.calculateScore('onePair') ).toBe(12);
        });
    });

    describe("calculateScore( 'twoPair' )", function() {
        // twoPair
        it("should return 0", function() {
            testPlayer.twoPair = [5,6,5,1,4];
            expect( testPlayer.calculateScore('twoPair') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.twoPair = [5,3,4,1,6];
            expect( testPlayer.calculateScore('twoPair') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.twoPair = [6,2,6,6,6];
            expect( testPlayer.calculateScore('twoPair') ).toBe(0);
        });
        it("should return 20", function() {
            testPlayer.twoPair = [4,2,6,4,6];
            expect( testPlayer.calculateScore('twoPair') ).toBe(20);
        });
    });

    describe("calculateScore( 'threeOfAKind' )", function() {
        // threeOfAKind
        it("should return 0", function() {
            testPlayer.threeOfAKind = [5,6,5,1,4];
            expect( testPlayer.calculateScore('threeOfAKind') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.threeOfAKind = [5,3,4,1,6];
            expect( testPlayer.calculateScore('threeOfAKind') ).toBe(0);
        });
        it("should return 18", function() {
            testPlayer.threeOfAKind = [6,2,6,6,6];
            expect( testPlayer.calculateScore('threeOfAKind') ).toBe(18);
        });
        it("should return 12", function() {
            testPlayer.threeOfAKind = [4,2,4,4,6];
            expect( testPlayer.calculateScore('threeOfAKind') ).toBe(12);
        });
    });

    describe("calculateScore( 'fourOfAKind' )", function() {
        // fourOfAKind
        it("should return 0", function() {
            testPlayer.fourOfAKind = [5,6,5,1,4];
            expect( testPlayer.calculateScore('fourOfAKind') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.fourOfAKind = [5,3,4,1,6];
            expect( testPlayer.calculateScore('fourOfAKind') ).toBe(0);
        });
        it("should return 24", function() {
            testPlayer.fourOfAKind = [6,2,6,6,6];
            expect( testPlayer.calculateScore('fourOfAKind') ).toBe(24);
        });
        it("should return 14", function() {
            testPlayer.fourOfAKind = [4,4,4,4,4];
            expect( testPlayer.calculateScore('fourOfAKind') ).toBe(16);
        });
    });

    describe("calculateScore( 'smallStraight' )", function() {
        // smallStraight
        it("should return 15", function() {
            testPlayer.smallStraight = [3,2,5,1,4];
            expect( testPlayer.calculateScore('smallStraight') ).toBe(15);
        });
        it("should return 0", function() {
            testPlayer.smallStraight = [5,3,4,1,6];
            expect( testPlayer.calculateScore('smallStraight') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.smallStraight = [3,2,5,6,4];
            expect( testPlayer.calculateScore('smallStraight') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.smallStraight = [4,4,4,4,4];
            expect( testPlayer.calculateScore('smallStraight') ).toBe(0);
        });
    });

    describe("calculateScore( 'largeStraight' )", function() {
        // largeStraight
        it("should return 0", function() {
            testPlayer.largeStraight = [3,2,5,1,4];
            expect( testPlayer.calculateScore('largeStraight') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.largeStraight = [5,3,4,1,6];
            expect( testPlayer.calculateScore('largeStraight') ).toBe(0);
        });
        it("should return 20", function() {
            testPlayer.largeStraight = [3,2,5,6,4];
            expect( testPlayer.calculateScore('largeStraight') ).toBe(20);
        });
        it("should return 0", function() {
            testPlayer.largeStraight = [4,4,4,4,4];
            expect( testPlayer.calculateScore('largeStraight') ).toBe(0);
        });
    });

    describe("calculateScore( 'fullHouse' )", function() {
        // fullHouse
        it("should return 0", function() {
            testPlayer.fullHouse = [2,6,2,1,4];
            expect( testPlayer.calculateScore('fullHouse') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.fullHouse = [6,3,5,1,1];
            expect( testPlayer.calculateScore('fullHouse') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.fullHouse = [3,3,5,3,6];
            expect( testPlayer.calculateScore('fullHouse') ).toBe(0);
        });
        it("should return 21", function() {
            testPlayer.fullHouse = [3,5,5,5,3];
            expect( testPlayer.calculateScore('fullHouse') ).toBe(21);
        });
        it("should return 0", function() {
            testPlayer.fullHouse = [4,4,4,4,4];
            expect( testPlayer.calculateScore('fullHouse') ).toBe(0);
        });
        it("should return 9", function() {
            testPlayer.fullHouse = [1,3,3,1,1];
            expect( testPlayer.calculateScore('fullHouse') ).toBe(9);
        });
    });

    describe("calculateScore( 'yahtzee' )", function() {
        // yahtzee
        it("should return 0", function() {
            testPlayer.yahtzee = [5,6,5,1,4];
            expect( testPlayer.calculateScore('yahtzee') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.yahtzee = [5,3,4,1,6];
            expect( testPlayer.calculateScore('yahtzee') ).toBe(0);
        });
        it("should return 0", function() {
            testPlayer.yahtzee = [6,2,6,6,6];
            expect( testPlayer.calculateScore('yahtzee') ).toBe(0);
        });
        it("should return 50", function() {
            testPlayer.yahtzee = [4,4,4,4,4];
            expect( testPlayer.calculateScore('yahtzee') ).toBe(50);
        });
    });

    describe("calculateScore( 'chance' )", function() {
        // chance
        it("should return 21", function() {
            testPlayer.chance = [5,6,5,1,4];
            expect( testPlayer.calculateScore('chance') ).toBe(21);
        });
        it("should return 19", function() {
            testPlayer.chance = [5,3,4,1,6];
            expect( testPlayer.calculateScore('chance') ).toBe(19);
        });
        it("should return 26", function() {
            testPlayer.chance = [6,2,6,6,6];
            expect( testPlayer.calculateScore('chance') ).toBe(26);
        });
        it("should return 20", function() {
            testPlayer.chance = [4,4,4,4,4];
            expect( testPlayer.calculateScore('chance') ).toBe(20);
        });
    });

});

// -------------------- Player.prototype.upperScore() --------------------


describe("upperScoreMethod", function() {

    const testPlayer = new Player('name1');

    // Reset all spaces to null after each run
    beforeEach(function() {
        testPlayer.aces = null;
        testPlayer.twos = null;
        testPlayer.threes = null;
        testPlayer.fours = null;
        testPlayer.fives = null;
        testPlayer.sixes = null;
        testPlayer.onePair = null;
        testPlayer.twoPair = null;
        testPlayer.threeOfAKind = null;
        testPlayer.fourOfAKind = null;
        testPlayer.smallStraight = null;
        testPlayer.largeStraight = null;
        testPlayer.fullHouse = null;
        testPlayer.yahtzee = null;
        testPlayer.chance = null;
    });


    describe("upperScore()", function() {
        // Everything is null
        it("should return 0", function() {
            expect( testPlayer.upperScore() ).toBe(0);
        });
        // Some results in upperScores only
        it("should return 41", function() {
            testPlayer.aces = [2,3,5,1,1]; // = 2
            testPlayer.fives = [5,3,4,5,5]; // = 15
            testPlayer.sixes = [6,4,6,6,6]; // = 24
            expect( testPlayer.upperScore() ).toBe(41);
        });
        // Some results in pokerScores only
        it("should return 0", function() {
            testPlayer.yahtzee = [2,2,2,2,2];
            testPlayer.fourOfAKind = [4,4,2,4,4];
            testPlayer.smallStraight = [1,3,5,4,2];
            expect( testPlayer.upperScore() ).toBe(0);
        });
        // Some results in upperScores + pokerScores 
        it("should return 32", function() {
            testPlayer.threes = [3,2,4,3,3]; // = 9
            testPlayer.fours = [2,4,6,4,1]; // = 8
            testPlayer.fives = [5,2,5,6,5]; // = 15
            testPlayer.yahtzee = [2,2,2,2,2];
            testPlayer.fourOfAKind = [4,4,2,4,4];
            testPlayer.smallStraight = [1,3,5,4,2];
            expect( testPlayer.upperScore() ).toBe(32);
        });
        // All results in upperScores
        it("should return 63", function() {
            testPlayer.aces = [2,1,5,1,1]; // = 3
            testPlayer.twos = [2,4,2,1,2]; // = 6
            testPlayer.threes = [3,2,4,3,3]; // = 9
            testPlayer.fours = [4,4,6,4,1]; // = 12
            testPlayer.fives = [5,2,5,6,5]; // = 15
            testPlayer.sixes = [6,4,6,6,1]; // = 18
            expect( testPlayer.upperScore() ).toBe(63);
        });
    });
});


// -------------------- Player.prototype.totalScore() --------------------

describe("totalScoreMethod", function() {

    const testPlayer = new Player('name1');

    // Reset all spaces to null after each run
    beforeEach(function() {
        testPlayer.aces = null;
        testPlayer.twos = null;
        testPlayer.threes = null;
        testPlayer.fours = null;
        testPlayer.fives = null;
        testPlayer.sixes = null;
        testPlayer.onePair = null;
        testPlayer.twoPair = null;
        testPlayer.threeOfAKind = null;
        testPlayer.fourOfAKind = null;
        testPlayer.smallStraight = null;
        testPlayer.largeStraight = null;
        testPlayer.fullHouse = null;
        testPlayer.yahtzee = null;
        testPlayer.chance = null;
    });


    describe("totalScore()", function() {
        // Everything is null
        it("should return 0", function() {
            expect( testPlayer.totalScore() ).toBe(0);
        });
        // Some results in upperScores only
        it("should return 41", function() {
            testPlayer.aces = [2,3,5,1,1]; // = 2
            testPlayer.fives = [5,3,4,5,5]; // = 15
            testPlayer.sixes = [6,4,6,6,6]; // = 24
            expect( testPlayer.totalScore() ).toBe(41);
        });
        // Some results in pokerScores only
        it("should return 81", function() {
            testPlayer.yahtzee = [2,2,2,2,2]; // = 50
            testPlayer.fourOfAKind = [4,4,2,4,4]; // = 16
            testPlayer.smallStraight = [1,3,5,4,2]; // = 15
            expect( testPlayer.totalScore() ).toBe(81);
        });
        // Some results in upperScores + pokerScores 
        it("should return 97", function() {
            testPlayer.threes = [3,2,4,3,3]; // = 9
            testPlayer.fours = [2,4,6,4,1]; // = 8
            testPlayer.fives = [5,2,5,6,5]; // = 15
            testPlayer.yahtzee = [2,2,2,2,2]; // = 50
            testPlayer.fourOfAKind = [4,4,2,3,4]; // = 0
            testPlayer.smallStraight = [1,3,5,4,2]; // = 15
            expect( testPlayer.totalScore() ).toBe(97);
        });
        // Results in upperScore = 63 = 63 + upperBonus of 50
        it("should return 113", function() {
            testPlayer.aces = [2,1,5,1,1]; // = 3
            testPlayer.twos = [2,4,2,1,2]; // = 6
            testPlayer.threes = [3,2,4,3,3]; // = 9
            testPlayer.fours = [4,4,6,4,1]; // = 12
            testPlayer.fives = [5,2,5,6,5]; // = 15
            testPlayer.sixes = [6,4,6,6,1]; // = 18
            expect( testPlayer.totalScore() ).toBe(113);
        });
        // All results in upperScore (no bonus) + totalScore
        it("should return 184", function() {
            testPlayer.aces = [2,1,5,1,1]; // = 3
            testPlayer.twos = [2,4,1,1,6]; // = 2
            testPlayer.threes = [3,2,4,3,3]; // = 9
            testPlayer.fours = [4,4,6,4,1]; // = 12
            testPlayer.fives = [5,2,5,6,5]; // = 15
            testPlayer.sixes = [6,4,2,6,1]; // = 12
            testPlayer.onePair = [5,6,2,3,5]; // = 10
            testPlayer.twoPair = [2,4,5,1,1]; // = 0
            testPlayer.threeOfAKind = [6,6,2,3,6]; // = 18
            testPlayer.fourOfAKind = [3,3,3,1,6]; // = 0
            testPlayer.smallStraight = [1,3,2,5,4]; // = 15
            testPlayer.largeStraight = [2,3,5,5,1]; // =  0
            testPlayer.fullHouse = [2,2,5,5,5]; // = 19
            testPlayer.yahtzee = [1,1,1,1,1]; //= 50
            testPlayer.chance = [1,5,5,5,3]; // = 19
            expect( testPlayer.totalScore() ).toBe(184);
        });
    });
});