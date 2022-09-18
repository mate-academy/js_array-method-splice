'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    const arrayBeforeSplice = [];
    const arrayAfterSplice = [];
    const deletedItems = [];

    let startIndex = start;
    let deleteElementNumber = deleteCount;

    if (arguments.length === 0) {
      return deletedItems;
    }

    if (startIndex > this.length) {
      startIndex = this.length;
    }

    if (startIndex < 0) {
      startIndex += this.length;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (deleteElementNumber === undefined
    || deleteElementNumber > this.length - startIndex) {
      deleteElementNumber = this.length - startIndex;
    }

    for (let i = 0; i < startIndex; i++) {
      arrayBeforeSplice.push(this[i]);
    }

    for (let i = startIndex; i < this.length; i++) {
      if (i < startIndex + deleteElementNumber) {
        deletedItems.push(this[i]);
      } else {
        arrayAfterSplice.push(this[i]);
      }
    }

    let resultArray = [...arrayBeforeSplice, ...items, ...arrayAfterSplice];

    if (items === undefined) {
      resultArray = [...arrayBeforeSplice, ...arrayAfterSplice];
    }

    if (resultArray.length < this.length) {
      this.length = 0;
    }

    for (let i = 0; i < resultArray.length; i++) {
      this[i] = resultArray[i];
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
