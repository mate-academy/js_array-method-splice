'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (arguments.length === 0 || start > this.length) {
      return [];
    }

    const splicedArray = [];
    let newArray = [];
    let startIndex = start || 0;
    let deleteIndex = deleteCount || this.length - 1;

    if (startIndex === 0) {
      deleteIndex = deleteCount - 1;
    }

    if (startIndex < 0) {
      startIndex = Math.max((this.length + startIndex), 0);
    }

    if (deleteCount === 0) {
      for (let i = 0; i < startIndex; i++) {
        newArray.push(this[i]);
      }
    } else {
      for (let i = 0; i <= deleteIndex; i++) {
        if (i >= startIndex) {
          splicedArray.push(this[i]);
        } else {
          newArray.push(this[i]);
        }
      }
    }

    const resultLength = newArray.length;
    newArray = [...newArray, ...items];

    for (let i = splicedArray.length + resultLength; i < this.length; i++) {
      newArray.push(this[i]);
    }

    this.length = 0;

    for (let i = 0; i < newArray.length; i++) {
      this.push(newArray[i]);
    }

    return splicedArray;
  };
}

module.exports = applyCustomSplice;
