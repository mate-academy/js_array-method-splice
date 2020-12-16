'use strict';

/**
 * Implement method Splice
 */

function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const spliceArr = [...this];
    const resultArr = [];
    const newComers = [];
    let actualStart = +start;
    let actualDelete = +deleteCount;

    // check start value typeof
    if (typeof actualStart !== 'number' || isNaN(actualStart)) {
      actualStart = 0;
    }

    if (typeof actualDelete !== 'number' || isNaN(actualStart)) {
      actualDelete = 0;
    }

    for (let i = 2; i < items.length; i++) {
      newComers[newComers.length] = arguments[i];
    }

    // check for unaccaptable parameters
    if (arguments.length === 0 || start > this.length || actualDelete < 0) {
      return [];
    }

    if (start * (-1) > this.length) {
      this.length = 0;

      return spliceArr;
    }

    // arguments length === 1

    if (arguments.length === 1) {
      if (actualStart < 0) {
        this.length += actualStart;

        for (let i = this.length; i < spliceArr.length; i++) {
          let j = 0;

          resultArr[j] = spliceArr[i];
          j++;
        }
      } else {
        this.length = actualStart;

        for (let i = actualStart; i < spliceArr.length; i++) {
          resultArr[i - actualStart] = spliceArr[i];
        }
      }
    }

    // arguments length === 2

    if (arguments.length === 2) {
      if (actualStart > 0) {
        this.length = actualStart;

        for (let i = actualDelete + 1; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        for (let i = actualStart; i <= actualDelete; i++) {
          resultArr[resultArr.length] = spliceArr[i];
        }
      } else if (actualStart < 0) {
        this.length += actualStart;

        for (let i = actualDelete + 1; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        for (let i = spliceArr.length + actualStart; i <= actualDelete; i++) {
          resultArr[resultArr.length] = spliceArr[i];
        }
      } else {
        this.length = actualStart;

        for (let i = actualDelete; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        for (let i = 0; i < actualDelete; i++) {
          resultArr[i] = spliceArr[i];
        }
      }
    }

    // arguments length > 2

    if (arguments.length > 2) {
      this.length = actualStart;

      for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
      }

      if (actualDelete === 0) {
        for (let i = actualStart; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }
      } else {
        for (let i = actualDelete + 1; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        for (let i = actualStart; i <= actualDelete; i++) {
          resultArr[resultArr.length] = spliceArr[i];
        }
      }
    }

    return resultArr;
  };
}

module.exports = applyCustomSplice;
