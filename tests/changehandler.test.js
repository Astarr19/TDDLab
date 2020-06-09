let { ChangeHandler } = require("../src/changehandler");

describe("ChangeHandler tests", function(){
    test("Constructor tests", function(){
        let transaction = new ChangeHandler(245)

        expect(transaction.amountDue).toBe(245);
        expect(transaction.cashTendered).toBe(0);
    });

    test("inserting coins", function(){
        let transaction = new ChangeHandler()
        transaction.insertCoin('penny');
        expect(transaction.cashTendered).toBe(1);
        transaction.insertCoin('nickel');
        expect(transaction.cashTendered).toBe(6);
        transaction.insertCoin('dime');
        expect(transaction.cashTendered).toBe(16);
        transaction.insertCoin('quarter');
        expect(transaction.cashTendered).toBe(41);
    })

    test("sufficient payment more than amountDue", function(){
        let transaction = new ChangeHandler(25);
        transaction.insertCoin('quarter');
        transaction.insertCoin('penny');
        expect(transaction.isPaymentSufficient()).toBe(true);
    })

    test("sufficient payment equal to amountDue", function(){
        let transaction = new ChangeHandler(10);
        transaction.insertCoin('dime');
        expect(transaction.isPaymentSufficient()).toBe(true);
    })

    test("sufficient payment less than amountDue", function(){
        let transaction = new ChangeHandler(25);
        transaction.insertCoin('dime');
        expect(transaction.isPaymentSufficient()).toBe(false);
    })

    test('giveChange A', function(){
        let transaction = new ChangeHandler(50);
        transaction.cashTendered = 82;
        expect(transaction.giveChange()).toMatchObject({quarters: 1, dimes: 0, nickels: 1, pennies: 2})
    })

    test('giveChange B', function(){
        let transaction = new ChangeHandler(60);
        transaction.cashTendered = 70;
        expect(transaction.giveChange()).toMatchObject({quarters: 0, dimes: 1, nickels: 0, pennies: 0})
    })

    test('giveChange C', function(){
        let transaction = new ChangeHandler(50);
        transaction.cashTendered = 77;
        expect(transaction.giveChange()).toMatchObject({quarters: 1, dimes: 0, nickels: 0, pennies: 2})
    })

    test('giveChange D', function(){
        let transaction = new ChangeHandler(32);
        transaction.cashTendered = 100;
        expect(transaction.giveChange()).toMatchObject({quarters: 2, dimes: 1, nickels: 1, pennies: 3})
    })
})
