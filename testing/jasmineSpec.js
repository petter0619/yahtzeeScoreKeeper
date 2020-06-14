describe("calculateScoreMethod", function() {

    const testPlayer = new Player('name1');

        /*
        // Set diceResult values to test
        testPlayer1.aces = [1,1,1,1,1];
        testPlayer1.twos = [];
        testPlayer1.threes = [];
        testPlayer1.fours = [];
        testPlayer1.fives = [];
        testPlayer1.sixes = [];

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



});
