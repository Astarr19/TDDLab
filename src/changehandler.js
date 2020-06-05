/**
 * This class handles change for a vending machine.
 *
 * IMPORTANT: All amounts are in cents. E.g. $1.35 = 135. This will help with rounding errors.
 */
class ChangeHandler {
  constructor(amountDue) {
    this.amountDue = amountDue;
    this.cashTendered = 0;
  }

  /**
   * The customer inserts a coin, increasing the cashTendered.
   * The parameter "type" is a string that is either quarter, dime, nickel, or penny
   */
  insertCoin(type) {
    if (type === "penny") {
      this.cashTendered += 1;
    } else if (type === "nickel") {
      this.cashTendered += 5;
    } else if (type === "dime") {
      this.cashTendered += 10;
    } else {
      this.cashTendered += 25;
    }
  }

  /**
   * Returns true if enough coins have been inserted to at least meet the amountDue
   */
  isPaymentSufficient() {
    if (this.cashTendered >= this.amountDue) {
      return true;
    } else if (this.cashTendered < this.amountDue) {
      return false;
    }
  }

  giveChange() {
    let quarters = 0;
    let dimes = 0;
    let nickels = 0;
    let pennies = 0;
    let changeLeft = this.cashTendered - this.amountDue;
    while (changeLeft > 0) {
      if (changeLeft >= 25) {
        changeLeft -= 25;
        quarters++;
      } else if (changeLeft >= 10) {
        changeLeft -= 10;
        dimes++;
      } else if (changeLeft >= 5) {
        changeLeft -= 5;
        nickels++;
      } else if (changeLeft >= 1) {
        changeLeft -= 1;
        pennies++;
      }
    }
    return {
      quarters: quarters,
      dimes: dimes,
      nickels: nickels,
      pennies: pennies
    };
  }
}

module.exports = { ChangeHandler };
