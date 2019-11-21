'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0,
    deleteCount = this.length - 1, ...items) {
    // write code here
    const result = [];
    let tempArray = [];
    let startIndex = start;
    let deletedItems = deleteCount;

    if (arguments.length === 0 || start > this.length) {
      return [];
    }
    if (startIndex === 0) {
      deletedItems = deleteCount - 1;
    } else if (startIndex < 0) {
      startIndex = this.length + startIndex > 0 ? this.length + startIndex : 0;
    }
    if (deleteCount === 0) {
      for (let j = 0; j < startIndex; j++) {
        tempArray[tempArray.length] = this[j];
      }
    } else {
      for (let j = 0; j <= deletedItems; j++) {
        if (j >= startIndex) {
          result[result.length] = this[j];
        } else {
          tempArray[tempArray.length] = this[j];
        }
      }
    }

    const oldLength = tempArray.length;
    tempArray = [...tempArray, ...items];

    for (let i = result.length + oldLength; i < this.length; i++) {
      tempArray[tempArray.length] = this[i];
    }

    this.length = 0;

    for (let i = 0; i < tempArray.length; i++) {
      this[this.length] = tempArray[i];
    }

    return result;
  };
}

module.exports = applyCustomSplice;
