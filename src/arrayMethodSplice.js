'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount = this.length, ...items) {
    // write code here
    if (!items) {
      items = [];
    }

    const deletedItems = [];
    const currLength = this.length;

    let deleteStartIndex = start;
    if (deleteStartIndex > currLength) {
      deleteStartIndex = currLength;
    } else if (deleteStartIndex < 0) {
      deleteStartIndex = currLength + start;
    }
    if (deleteStartIndex < 0) {
      deleteStartIndex = 0;
    }

    let deleteEndIndex = deleteStartIndex + deleteCount - 1;
    if (deleteEndIndex > currLength - 1) {
      deleteEndIndex = currLength - 1;
    }

    const lengthCorrection = items.length - (deleteEndIndex - deleteStartIndex + 1);
    const newLength = currLength + lengthCorrection;

    for (let i = 0; i < (deleteEndIndex - deleteStartIndex + 1); i++) {
      deletedItems[i] = this[deleteStartIndex + i];
    }

    if (lengthCorrection > 0) {
      for (let i = currLength - 1; i > deleteEndIndex; i--) {
        this[i + lengthCorrection] = this[i];
      }
    } else if (lengthCorrection < 0) {
      for (let i = deleteEndIndex + 1; i < currLength; i++) {
        this[i + lengthCorrection] = this[i];
      }
    }

    for (let i = 0; i < items.length; i++) {
      this[deleteStartIndex + i] = items[i];
    }

    this.length = newLength;
    return deletedItems;
  };
}

module.exports = applyCustomSplice;
