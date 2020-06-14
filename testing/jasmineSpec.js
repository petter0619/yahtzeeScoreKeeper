describe("calculateScoreMethod", function() {

    const testPlayer = new Player('name1');

        /*
        testPlayer1.onePair = [];
        testPlayer1.twoPair = [];
        testPlayer1.threeOfAKind = [];
        testPlayer1.fourOfAKind = [];
        testPlayer1.smallStraight = [];
        testPlayer1.largeStraight = [];
        testPlayer1.fullHouse = [];
        testPlayer1.yahtzee = [];
        testPlayer1.chance = [];
        */

    describe("calculateScoreMethod( 'aces' )", function() {
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

    describe("calculateScoreMethod( 'twos' )", function() {
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

    describe("calculateScoreMethod( 'threes' )", function() {
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

    describe("calculateScoreMethod( 'fours' )", function() {
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

    describe("calculateScoreMethod( 'fives' )", function() {
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

    describe("calculateScoreMethod( 'sixes' )", function() {
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


});
