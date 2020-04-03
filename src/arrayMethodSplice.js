'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount = 0, ...items) {
    // write code here
    let myStart = start;
    const newArr = [];
    const myArguments = Array.from(arguments);
    const myLength = this.length;

    if (myArguments.length > 0) {
      if (start > myLength && myLength > 0) {
        myStart = myLength;
      } else if (start < 0 && Math.abs(start) <= myLength - 1) {
        myStart = myLength + start;
      } else if (start < 0 && Math.abs(start) > myLength - 1) {
        myStart = 0;
      }

      if (deleteCount > 0) {
        for (let i = 0; i < deleteCount; i++) {
          if (this[i + myStart] !== undefined) {
            newArr[i] = this[i + myStart];
          }
        }

        for (let i = 0; i < deleteCount; i++) {
          this[i + myStart] = this[i + myStart + deleteCount];
        }
        this.length = this.length - deleteCount;
      } else if (deleteCount === 0 && myArguments.length <= 2) {
        for (let i = myStart; i < this.length; i++) {
          newArr[i - myStart] = this[i];
        }
        this.length = myStart;
      }

      if (myArguments.length > 2) {
        if (this.length > 0) {
          for (let i = this.length - 1; i >= myStart; i--) {
            this[i + myArguments.length - 2] = this[i];
          }
        }

        for (let i = 0; i < myArguments.length - 2; i++) {
          this[i + myStart] = myArguments[i + 2];
        }
      }
    }

    return newArr;
  };
}

module.exports = applyCustomSplice;
