'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let searchFrom;
    let copiedItemsFromStartIndex = [];
    const deletedItems = [];
    let deleteLength;

    if ((start < 0 && (this.length + start) < 0)
    || (!start && arguments.length)) {
      searchFrom = 0;
    } else if (start < 0) {
      searchFrom = this.length + start;
    } else if (start > this.length) {
      searchFrom = this.length;
    } else {
      searchFrom = start;
    }

    for (let i = searchFrom; i < this.length; i++) {
      copiedItemsFromStartIndex = [ ...copiedItemsFromStartIndex, this[i] ];
    }

    this.length = this.length - copiedItemsFromStartIndex.length;

    if (arguments[1] === undefined) {
      return copiedItemsFromStartIndex;
    }

    (deleteCount > copiedItemsFromStartIndex.length)
      ? deleteLength = copiedItemsFromStartIndex.length
      : deleteLength = deleteCount;

    for (let i = 0; i < deleteLength; i++) {
      deletedItems[deletedItems.length] = copiedItemsFromStartIndex[0];

      for (let j = 0; j < copiedItemsFromStartIndex.length; j++) {
        copiedItemsFromStartIndex[j] = copiedItemsFromStartIndex[j + 1];
      }
      copiedItemsFromStartIndex.length--;
    }

    for (let i = 0; i < items.length; i++) {
      this[searchFrom + i] = items[i];
    }

    for (let i = 0; i < copiedItemsFromStartIndex.length; i++) {
      this[this.length] = copiedItemsFromStartIndex[i];
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
