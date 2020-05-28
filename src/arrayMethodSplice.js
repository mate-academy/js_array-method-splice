'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const leftArr = [];
    const rightArr = [];
    const removedElements = [];

    if (arguments.length < 1 || start > this.length || deleteCount < 0) {
      return [];
    }

    let startPoint = 0;
    if (start < 0 && start > -this.length) {
      startPoint = this.length + start;
    } else if (start < -this.length || start === undefined) {
      startPoint = 0;
    } else {
      startPoint = start;
    }

    if (startPoint > 0) {
      for (let i = 0; i < startPoint; i++) {
        leftArr[leftArr.length] = this[i];
      }
    }

    let removeEnd = deleteCount !== undefined
      ? (deleteCount + startPoint)
      : this.length;

    for (startPoint; startPoint < removeEnd; startPoint++) {
      removedElements[removedElements.length] = this[startPoint];
    }

    if (removeEnd !== this.length) {
      for (removeEnd; removeEnd < this.length; removeEnd++) {
        rightArr[rightArr.length] = this[removeEnd];
      }
    }

    const splicedArr = [...items].length > 0
      ? [...leftArr, ...items, ...rightArr]
      : [...leftArr, ...rightArr];

    for (let i = 0; i < splicedArr.length; i++) {
      this[i] = splicedArr[i];
    }

    this.length = splicedArr.length;

    return removedElements;
  };
}

module.exports = applyCustomSplice;
