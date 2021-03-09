'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const result = [];
    let indexStart = parseInt(start);
    let indexForResult = 0;
    let indexDeleteCount = deleteCount;

    if (start === undefined || isNaN(start) || start === null) {
      indexStart = 0;

      if (deleteCount === undefined) {
        indexDeleteCount = 0;
      }
    }

    if (Math.abs(indexStart) > this.length) {
      if (indexStart >= 0) {
        indexStart = this.length;
      } else {
        indexStart = 0;
      }
    } else {
      if (indexStart < 0) {
        indexStart = this.length + indexStart;
      }
    }

    if (indexDeleteCount === undefined
      || indexDeleteCount > this.length - indexStart) {
      indexDeleteCount = this.length;
    } else if (indexDeleteCount >= 0) {
      indexDeleteCount = indexStart + indexDeleteCount;
    }

    indexForResult = 0;

    for (let i = indexStart; i < indexDeleteCount; i++) {
      result[indexForResult] = this[i];
      indexForResult++;
    }

    if (items.length === 0) {
      indexForResult = 0;

      for (let j = 0; j < this.length; j++) {
        if (!result.includes(this[j])) {
          this[indexForResult] = this[j];
          indexForResult++;
        }
      }
      this.length = this.length - result.length;
    } else if (items.length > 0) {
      indexForResult = 0;

      const newArr = this.slice();

      this.length = newArr.length - result.length + items.length;
      deleteCount > 0 ? indexDeleteCount = deleteCount : indexDeleteCount = 0;

      for (let k = 0; k < this.length; k++) {
        if (k < indexStart) {
          this[k] = newArr[indexForResult];
          indexForResult++;
        } else if (k >= indexStart && k < indexStart + items.length) {
          this[k] = items[k - indexStart];
          indexForResult++;
        } else {
          this[k] = newArr[indexStart + indexDeleteCount];
          indexDeleteCount++;
        }
      }
    }

    return result;
  };
};

module.exports = applyCustomSplice;
