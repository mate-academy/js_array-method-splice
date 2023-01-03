'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    const deletedElements = [];
    const itemsAfterDeleted = [];
    let startIndex = start;
    let deleteItems = deleteCount;

    if (startIndex === 0 && deleteItems === undefined) {
      return deletedElements;
    }

    if (startIndex < 0) {
      startIndex += this.length;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (startIndex >= this.length) {
      startIndex = this.length;
    }

    if (deleteItems < 0) {
      deleteItems = 0;
    }

    if (deleteItems === undefined) {
      deleteItems = this.length - startIndex;
    }

    for (let i = startIndex + deleteItems; i < this.length; i++) {
      itemsAfterDeleted[itemsAfterDeleted.length] = this[i];
    }

    for (let i = startIndex; i < startIndex + deleteItems; i++) {
      deletedElements[deletedElements.length] = this[i];
    }

    this.length = startIndex;

    for (const item of items) {
      this[this.length] = item;
    }

    for (const item of itemsAfterDeleted) {
      this[this.length] = item;
    }

    return deletedElements;
  };
}

module.exports = applyCustomSplice;
