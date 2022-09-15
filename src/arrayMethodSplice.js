'use strict';

/**
 * Implement method Splice
 */

function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (start === 0 && !deleteCount && items.length === 0) {
      return [];
    }

    const deletedItem = [];
    const addedItems = [...items];
    let startIndex = start;

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

    let deletedAmount = deleteCount;

    if (!deleteCount && addedItems.length === 0) {
      deletedAmount = this.length - startIndex;
    }

    if (deleteCount > (this.length - startIndex)) {
      deletedAmount = this.length - startIndex;
    }

    if (deletedAmount + startIndex > this.length) {
      deletedAmount = this.length - startIndex;
    }

    if (deleteCount < 0) {
      deletedAmount = 0;
    }

    for (let i = 0; i < deletedAmount; i++) {
      deletedItem.push(this[startIndex]);
      startIndex++;
    }

    const elementsAfterDeleted = this.slice(startIndexAdd + deletedAmount);

    this.length = startIndexAdd;

    for (let i = 0; i < addedItems.length; i++) {
      this[startIndexAdd + i] = addedItems[i];
    }

    for (let i = 0; i < elementsAfterDeleted.length; i++) {
      this[this.length] = elementsAfterDeleted[i];
    }

    return deletedItem;
  };
}

module.exports = applyCustomSplice;
