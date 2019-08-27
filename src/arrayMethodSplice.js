'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const leftArr = [];
    const rightArr = [];
    const removed = [];

    if (arguments.length < 1 || start > this.length || deleteCount < 0) {
      return [];
    }

    let first = 0;
    if (start < 0 && start > -this.length) {
      first = this.length + start;
    } else if (start < -this.length || start === undefined) {
      first = 0;
    } else {
      first = start;
    }

    const startPoint = first;

    let pauseFirst = deleteCount !== undefined
      ? (deleteCount + first)
      : this.length;

    for (first; first < pauseFirst; first++) {
      removed[removed.length] = this[first];
    }

    if (startPoint > 0) {
      for (let i = 0; i < startPoint; i++) {
        leftArr[leftArr.length] = this[i];
      }
    }

    if (pauseFirst !== this.length) {
      for (pauseFirst; pauseFirst < this.length; pauseFirst++) {
        rightArr[rightArr.length] = this[pauseFirst];
      }
    }

    const splicedArr = [...items].length > 0
      ? [...leftArr, ...items, ...rightArr]
      : [...leftArr, ...rightArr];

    for (let i = 0; i < splicedArr.length; i++) {
      this[i] = splicedArr[i];
    }

    this.length = splicedArr.length;

    return removed;
  };
}

module.exports = applyCustomSplice;
