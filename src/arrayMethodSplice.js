'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (arguments.length === 0 || start > this.length) {
      return [];
    }

    const result = [];
    let arr = [];
    let startIndex = start || 0;
    let deleteIndex = deleteCount || this.length - 1;

    if (startIndex === 0) {
      deleteIndex = deleteCount - 1;
    } else if (startIndex < 0) {
      startIndex = Math.max((this.length + startIndex), 0);
    }

    if (deleteCount === 0) {
      for (let j = 0; j < startIndex; j++) {
        arr.push(this[j]);
      }
    } else {
      for (let j = 0; j <= deleteIndex; j++) {
        if (j >= startIndex) {
          result.push(this[j]);
        } else {
          arr.push(this[j]);
        }
      }
    }

    const len = arr.length;

    arr = [...arr, ...items];

    for (let i = result.length + len; i < this.length; i++) {
      arr.push(this[i]);
    }

    this.length = 0;

    for (let i = 0; i < arr.length; i++) {
      this.push(arr[i]);
    }

    return result;
  };
}

module.exports = applyCustomSplice;
