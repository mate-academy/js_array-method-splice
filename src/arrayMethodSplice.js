'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const result = [];

    if (start === undefined) {
      return result;
    }

    let indexStart = 0;

    if (start >= 0) {
      indexStart = start;
    } else {
      indexStart = this.length + start;
    }

    if (indexStart > this.length) {
      indexStart = this.length;
    }

    if (indexStart < 0) {
      indexStart = 0;
    }

    let countOfDel = deleteCount;

    if (deleteCount === undefined || deleteCount + indexStart > this.length) {
      countOfDel = this.length - indexStart;
    }

    if (deleteCount < 0) {
      countOfDel = 0;
    }

    for (let i = indexStart; i < indexStart + countOfDel; i++) {
      result[result.length] = this[i];
    }

    const newThis = [];

    for (let i = 0; i < indexStart; i++) {
      newThis[newThis.length] = this[i];
    }

    for (let i = 0; i < items.length; i++) {
      newThis[newThis.length] = items[i];
    }

    for (let i = indexStart + countOfDel; i < this.length; i++) {
      newThis[newThis.length] = this[i];
    }

    for (let i = 0; i < newThis.length; i++) {
      this[i] = newThis[i];
    }

    this.length = newThis.length;

    return result;
  };
}

module.exports = applyCustomSplice;
