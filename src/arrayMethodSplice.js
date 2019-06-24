'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount = this.length, ...items) {
    // write code here
    const deletedItems = []; // Resulting array of deleted items to return

    // If no arguments are given
    if (!start) {
      return deletedItems;
    }

    // If there no items to insert - making an ampty array "items"
    if (!items) {
      items = [];
    }

    const currLength = this.length;

    // Checking start index
    let deleteStartIndex = start;
    if (deleteStartIndex > currLength) {
      deleteStartIndex = currLength;
    } else if (deleteStartIndex < 0) {
      deleteStartIndex = currLength + start;
    }
    if (deleteStartIndex < 0) {
      deleteStartIndex = 0;
    }

    // Calculating delete end index
    let deleteEndIndex = deleteStartIndex + deleteCount - 1;
    if (deleteEndIndex > currLength - 1) {
      deleteEndIndex = currLength - 1;
    }

    // Calculating resulting array length after deleting and inserting all items
    const lengthCorrection = items.length - (deleteEndIndex - deleteStartIndex + 1);
    const newLength = currLength + lengthCorrection;

    // Fill the resulting array of deleted items
    for (let i = 0; i < (deleteEndIndex - deleteStartIndex + 1); i++) {
      deletedItems[i] = this[deleteStartIndex + i];
    }

    // Transfer items to correct positions in the given array
    // If given array expands - then moving items one-by-one to the end of array
    // Else if given array decreases - then moving items on-by-one closer to the begining of array
    // If given array stays the same length - doing nothing
    if (lengthCorrection > 0) {
      for (let i = currLength - 1; i > deleteEndIndex; i--) {
        this[i + lengthCorrection] = this[i];
      }
    } else if (lengthCorrection < 0) {
      for (let i = deleteEndIndex + 1; i < currLength; i++) {
        this[i + lengthCorrection] = this[i];
      }
    }

    // Copying items to insert to their places in array
    for (let i = 0; i < items.length; i++) {
      this[deleteStartIndex + i] = items[i];
    }

    // Correcting the length of array if it decreases and automaticaly deleting elemens that are no loger needed
    this.length = newLength;
    return deletedItems;
  };
}

module.exports = applyCustomSplice;
