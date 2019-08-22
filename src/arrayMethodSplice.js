'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let splicedArr = [];
    const leftArr = [];
    const rightArr = [];
    const removed = [];
    if (arguments.length < 1 || start > this.length || deleteCount < 0) {
      return [];
    }
    let first = 0;
    start < 0 && start > -this.length
      ? (first = this.length + start)
      : start < -this.length || start === undefined
        ? (first = 0)
        : (first = start);
    const startPoint = first;
    let pauseFirst = 0;
    deleteCount !== undefined
      ? (pauseFirst = deleteCount + first)
      : (pauseFirst = this.length);

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

    if ([...items].length > 0) {
      splicedArr = [...leftArr, ...items, ...rightArr];
    } else {
      splicedArr = [...leftArr, ...rightArr];
    }

    for (let i = 0; i < splicedArr.length; i++) {
      this[i] = splicedArr[i];
    }
    this.length = splicedArr.length;
    return removed;
  };
}

module.exports = applyCustomSplice;
