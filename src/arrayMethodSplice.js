'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let searchFrom;
    const itemsFromStartIndex = [];
    const deletedItems = [];
    let deleteLength;

    if ((start < 0 && (this.length + start) < 0)
      || (!start && arguments.length)
    ) {
      searchFrom = 0;
    } else if (start < 0) {
      searchFrom = this.length + start;
    } else if (start > this.length) {
      searchFrom = this.length;
    } else {
      searchFrom = start;
    }

    for (let i = searchFrom; i < this.length; i++) {
      itemsFromStartIndex[itemsFromStartIndex.length] = this[i];
    }

    this.length = this.length - itemsFromStartIndex.length;

    if (arguments[1] === undefined) {
      return itemsFromStartIndex;
    }

    (deleteCount > itemsFromStartIndex.length)
      ? deleteLength = itemsFromStartIndex.length
      : deleteLength = deleteCount;

    for (let i = 0; i < deleteLength; i++) {
      deletedItems[deletedItems.length] = itemsFromStartIndex[0];

      for (let j = 0; j < itemsFromStartIndex.length; j++) {
        itemsFromStartIndex[j] = itemsFromStartIndex[j + 1];
      }
      itemsFromStartIndex.length--;
    }

    for (let i = 0; i < items.length; i++) {
      this[searchFrom + i] = items[i];
    }

    for (let i = 0; i < itemsFromStartIndex.length; i++) {
      this[this.length] = itemsFromStartIndex[i];
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
