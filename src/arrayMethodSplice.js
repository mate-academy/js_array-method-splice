'use strict';

/**
 * Implement method Splice
 */

function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start,
    deleteCount = this.length - +start,
    ...items
  ) {
    let countDelete = +deleteCount;
    let count = 0;
    let begin = +start;
    const removedElement = [];
    const innerFirstArray = [];
    const innerLastArray = [];

    if (isNaN(begin) && isNaN(countDelete) && items.length === 0) {
      return [];
    }

    if (begin > this.length) {
      begin = this.length;
    } else if (begin < 0) {
      if (!(Math.abs(begin) > this.length)) {
        begin = this.length + begin;
      } else {
        begin = 0;
        countDelete = this.length;
      }
    } else if (isNaN(begin)) {
      begin = 0;
    }

    if (countDelete > this.length - begin) {
      countDelete = this.length - begin;
    } else if (countDelete < 0 || isNaN(countDelete)) {
      countDelete = 0;
    }

    // second part: splitting into 3 arrays

    for (let i = 0, j = 0; i < this.length; i++) {
      if (i === begin) {
        if (countDelete !== 0) {
          let k = begin;

          while (count < countDelete) {
            removedElement[j] = this[k];
            j++;
            k++;
            count++;
          }
          i = begin + countDelete - 1;
          j = 0;
        } else {
          innerLastArray[j] = this[i];
          j++;
        }
      } else {
        if (i === innerFirstArray.length) {
          innerFirstArray[i] = this[i];
        } else {
          innerLastArray[j] = this[i];
          j++;
        }
      }
    }

    // third part: overwriting the original array

    const needLength = innerFirstArray.length + innerLastArray.length;
    const promArray = [...innerFirstArray, ...innerLastArray];
    const addPromArray = [...innerFirstArray, ...items, ...innerLastArray];

    this.length = 0;

    if (items.length === 0) {
      for (let i = 0; i < needLength; i++) {
        this[i] = promArray[i];
      }
    } else {
      for (let i = 0; i < needLength + items.length; i++) {
        this[i] = addPromArray[i];
      }
    }

    return removedElement;
  };
}

module.exports = applyCustomSplice;
