'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let searchFrom;
    const copied = [];
    let deletedItems = [];
    let deleteLength;

    if ((start < 0 && (this.length + start) < 0)
    || (start === undefined && arguments.length)) {
      searchFrom = 0;
    } else if (start < 0) {
      searchFrom = this.length + start;
    } else if (start > this.length) {
      searchFrom = this.length;
    } else {
      searchFrom = start;
    }

    for (let i = searchFrom; i < this.length; i++) {
      copied[copied.length] = this[i];
    }

    const copiedLength = copied.length;

    for (let i = 0; i < copiedLength; i++) {
      this.length--;
    }

    if (arguments[1] === undefined) {
      deletedItems = [ ...copied ];

      return deletedItems;
    }

    (deleteCount > copied.length)
      ? deleteLength = copied.length
      : deleteLength = deleteCount;

    for (let i = 0; i < deleteLength; i++) {
      deletedItems[deletedItems.length] = copied[0];

      for (let j = 0; j < copied.length; j++) {
        copied[j] = copied[j + 1];
      }
      copied.length--;
    }

    for (let i = 0; i < items.length; i++) {
      this[searchFrom + i] = items[i];
    }

    for (let i = 0; i < copied.length; i++) {
      this[this.length] = copied[i];
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
