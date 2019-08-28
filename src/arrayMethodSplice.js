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

    let removedPoint = 0;
    if (start < 0 && start > -this.length) {
      removedPoint = this.length + start;
    } else if (start < -this.length || start === undefined) {
      removedPoint = 0;
    } else {
      removedPoint = start;
    }

    const removeStart = removedPoint;

    let removeEnd = deleteCount !== undefined
      ? (deleteCount + removedPoint)
      : this.length;

    for (removedPoint; removedPoint < removeEnd; removedPoint++) {
      removedElements[removedElements.length] = this[removedPoint];
    }

    if (removeStart > 0) {
      for (let i = 0; i < removeStart; i++) {
        leftArr[leftArr.length] = this[i];
      }
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
