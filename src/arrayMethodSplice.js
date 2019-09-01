'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, del, ...items) {
    const beforeStartIndex = [];
    const afterDeleteIndex = [];
    const output = [];
    const startIndex = start === undefined
      ? 0
      : start >= 0
        ? start
        : Math.max(start + this.length, 0);
    const deleteCount = del === undefined
      ? this.length - startIndex
      : del;

    if (deleteCount < 0
      || start > this.length
      || arguments.length === 0) {
      return [];
    }

    for (let i = 0; i < startIndex; i++) {
      beforeStartIndex.push(this[i]);
    }

    for (let j = 0; j < (this.length - startIndex - deleteCount); j++) {
      afterDeleteIndex.push(this[j + startIndex + deleteCount]);
    }

    for (let m = 0; m < deleteCount; m++) {
      output.push(this[startIndex + m]);
    }

    const result = [...beforeStartIndex, ...items, ...afterDeleteIndex];

    for (let k = 0; k < result.length; k++) {
      this[k] = result[k];
    }

    this.length = result.length;

    return output;
  };
}

module.exports = applyCustomSplice;
