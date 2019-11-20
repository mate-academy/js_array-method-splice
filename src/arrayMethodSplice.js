'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const splicedArray = [];
    let copyUserArray = [];
    let startIndex = start || 0;
    let deleteIndex = deleteCount || this.length - 1;

    if (arguments.length === 0 || start > this.length) {
      return [];
    }

    if (startIndex === 0) {
      deleteIndex = deleteCount - 1;
    }

    if (startIndex < 0) {
      startIndex = Math.max((this.length + startIndex), 0);
    }

    if (deleteCount === 0) {
      for (let i = 0; i < startIndex; i++) {
        copyUserArray.push(this[i]);
      }
    } else {
      for (let i = 0; i <= deleteIndex; i++) {
        if (i >= startIndex) {
          splicedArray.push(this[i]);
        } else {
          copyUserArray.push(this[i]);
        }
      }
    }

    const resultArrLength = copyUserArray.length;

    copyUserArray = [...copyUserArray, ...items];

    for (let i = splicedArray.length + resultArrLength; i < this.length; i++) {
      copyUserArray.push(this[i]);
    }

    this.length = 0;

    for (let i = 0; i < copyUserArray.length; i++) {
      this.push(copyUserArray[i]);
    }

    return splicedArray;
  };
}

module.exports = applyCustomSplice;
