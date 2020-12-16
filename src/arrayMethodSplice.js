'use strict';

/**
 * Implement method Splice
 */

function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    // first part: assignment of conditions
    let countDelete = deleteCount;
    let count = 0;
    let begin = start;
    const removedElement = [];
    const innerFirstArray = [];
    const innerLastArray = [];

    if (start === undefined && deleteCount === undefined
      && items.length === 0) {
      return [];
    }

    if (start > this.length) {
      begin = this.length;
    } else if (start < 0) {
      if (!(Math.abs(start) > this.length)) {
        begin = this.length + start;
      } else {
        begin = 0;
      }
    } else if (typeof start !== 'number' || isNaN(start)) {
      begin = 0;
    }

    if (deleteCount > this.length - start || deleteCount === undefined) {
      countDelete = this.length - begin;
    } else if (deleteCount < 0 || typeof deleteCount !== 'number') {
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
