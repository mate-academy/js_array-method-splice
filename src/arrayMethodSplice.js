'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const spliceArr = [...this];
    const resultArr = [];
    const newComers = [];

    for (let i = 2; i < items.length; i++) {
      newComers[newComers.length] = arguments[i];
    }

    if (arguments.length === 0 || start > this.length || deleteCount < 0) {
      return [];
    }

    if (start * (-1) > this.length) {
      this.length = 0;

      return spliceArr;
    }

    // arguments length === 1

    if (arguments.length === 1) {
      if (start < 0) {
        this.length += start;

        for (let i = this.length; i < spliceArr.length; i++) {
          let j = 0;

          resultArr[j] = spliceArr[i];
          j++;
        }
      } else {
        this.length = start;

        for (let i = start; i < spliceArr.length; i++) {
          resultArr[i - start] = spliceArr[i];
        }
      }
    }

    // arguments length === 2

    if (arguments.length === 2) {
      if (start > 0) {
        this.length = start;

        for (let i = deleteCount + 1; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        for (let i = start; i <= deleteCount; i++) {
          resultArr[resultArr.length] = spliceArr[i];
        }
      } else if (start < 0) {
        this.length += start;

        for (let i = deleteCount + 1; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        for (let i = spliceArr.length + start; i <= deleteCount; i++) {
          resultArr[resultArr.length] = spliceArr[i];
        }
      } else {
        this.length = 0;
        this[this.length] = spliceArr[deleteCount];

        for (let i = 0; i < deleteCount; i++) {
          resultArr[i] = spliceArr[i];
        }
      }
    }

    // arguments length > 2

    if (arguments.length > 2) {
      this.length = start;

      for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
      }

      if (deleteCount === 0) {
        for (let i = start; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }
      } else {
        for (let i = deleteCount + 1; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        for (let i = start; i <= deleteCount; i++) {
          resultArr[resultArr.length] = spliceArr[i];
        }
      }
    }

    return resultArr;
  };
}

module.exports = applyCustomSplice;
