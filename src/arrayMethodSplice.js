'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let startIndex = start || 0;
    let toDeleteCount = deleteCount || 0;
    const postDeleteItems = [];
    const deletedItems = [];

    if (startIndex < -this.length) {
      startIndex = 0;
    }

    if (startIndex < 0) {
      startIndex += this.length;
    }

    if (startIndex >= this.length) {
      toDeleteCount = 0;
      startIndex = this.length;
    }

    if (toDeleteCount > this.length - startIndex) {
      toDeleteCount = this.length - startIndex;
    }

    for (let i = startIndex + toDeleteCount; i < this.length; i++) {
      postDeleteItems[postDeleteItems.length] = this[i];
    }

    for (let i = startIndex; i < toDeleteCount + startIndex; i++) {
      deletedItems[deletedItems.length] = this[i];
    }

    this.length = startIndex;

    for (const item of items) {
      this[this.length] = item;
    }

    for (const item of postDeleteItems) {
      this[this.length] = item;
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
