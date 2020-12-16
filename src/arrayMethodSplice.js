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

    // check start value typeof and length
    if (typeof actualStart !== 'number'
      || isNaN(actualStart)
      || start * (-1) >= this.length) {
      actualStart = 0;
    }

    if (actualStart > this.length) {
      actualStart = this.length;
    }

    // check start value typeof and length
    if (typeof actualDelete !== 'number'
      || isNaN(actualDelete)
      || actualDelete < 0) {
      actualDelete = 0;
    }

    if (actualDelete >= this.length) { // THIS CAN BE IMPROVED!!!
      actualDelete = this.length;
    }

    for (let i = 2; i < items.length; i++) {
      newComers[newComers.length] = arguments[i];
    }

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
      if (actualStart < 0) {
        this.length += actualStart;

        const indexToAdd = this.length + actualDelete;

        for (let i = 0; i < items.length; i++) {
          this[this.length] = items[i];
        }

        for (let i = indexToAdd; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        const resultAddIndex = spliceArr.length + actualStart;

        for (let i = resultAddIndex; i < actualDelete + resultAddIndex; i++) {
          if (spliceArr[i]) {
            resultArr[resultArr.length] = spliceArr[i];
          }
        }
      } else {
        // mutated array

        this.length = actualStart;

        for (let i = 0; i < items.length; i++) {
          this[this.length] = items[i];
        }

        const startFromEnding = actualDelete + actualStart;

        for (let i = startFromEnding; i < spliceArr.length; i++) {
          this[this.length] = spliceArr[i];
        }

        // spliced array

        for (let i = actualStart; i < actualStart + actualDelete; i++) {
          if (spliceArr[i]) {
            resultArr[resultArr.length] = spliceArr[i];
          }
        }
      }
    }

    return resultArr;
  };
}

module.exports = applyCustomSplice;
