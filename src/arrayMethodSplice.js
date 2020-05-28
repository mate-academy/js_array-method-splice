'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (arguments.length === 0 || deleteCount < 0) {
      return [];
    }

    if (start > 0 && start > this.length - 1) {
      return [];
    }

    let resultArr = [];
    const arrCopy = [...this];

    let newStart;
    if (start < 0 - this.length) {
      newStart = 0;
    } else if (start < 0) {
      newStart = this.length + start;
    } else {
      newStart = start;
    }

    let newToDelete;
    if (deleteCount === undefined) {
      newToDelete = this.length - newStart;
    } else {
      newToDelete = deleteCount;
    }

    if (this.length === 0) {
      resultArr = [];
    } else {
      for (let j = 0; j <= newToDelete - 1; j++) {
        resultArr.push(this[j + newStart]);
      }
    }

    this.length = newStart;
    const startArr = this;

    const endArr = [];
    for (let i = 0; i <= arrCopy.length - newToDelete - newStart - 1; i++) {
      endArr[i] = arrCopy[i + newStart + newToDelete];
    }

    let sourceArr = [];
    if (items.length !== 0) {
      sourceArr = [...startArr, ...items, ...endArr];
    } else {
      sourceArr = [...startArr, ...endArr];
    }

    this.length = 0;
    for (let i = 0; i < sourceArr.length; i++) {
      this[this.length] = sourceArr[i];
    }

    return resultArr;
  };
}

module.exports = applyCustomSplice;
