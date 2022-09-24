'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (start === 0 && !deleteCount && items.length === 0) {
      return [];
    }

    let startIndex = start;
    const addItems = [...items];
    const removedValues = [];

    // normalizing start index
    if (start > this.length) {
      startIndex = this.length;
    }

    if (start < 0) {
      startIndex = this.length + start;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    const startIndexAdd = startIndex;

    // normalizing delete
    let howManyDelete = deleteCount;

    if (!deleteCount && addItems.length === 0) {
      howManyDelete = this.length - startIndex;
    }

    if (deleteCount > (this.length - startIndex)) {
      howManyDelete = this.length - startIndex;
    }

    if (howManyDelete + startIndex > this.length) {
      howManyDelete = this.length - startIndex;
    }

    if (deleteCount < 0) {
      howManyDelete = 0;
    }

    for (let i = 0; i < howManyDelete; i++) {
      removedValues.push(this[startIndex]);
      startIndex++;
    }

    const elementsAfterDeleted = this.slice(startIndexAdd + howManyDelete);

    this.length = startIndexAdd;

    for (let i = 0; i < addItems.length; i++) {
      this[startIndexAdd + i] = addItems[i];
    }

    for (let i = 0; i < elementsAfterDeleted.length; i++) {
      this[this.length] = elementsAfterDeleted[i];
    }

    return removedValues;
  };
}

module.exports = applyCustomSplice;
