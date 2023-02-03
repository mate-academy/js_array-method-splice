'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    startIndex,
    deleteCount = startIndex > 0 ? (this.length - startIndex) : -startIndex,
    ...items
  ) {
    // write code here
    let deleted = [];
    let start = startIndex || 0;
    const toDeleteCount = deleteCount || 0;

    if (start < 0) {
      start += this.length;
    }

    if (start < 0) {
      deleted = [...this];

      this.length = 0;

      return deleted;
    }

    if (start > this.length) {
      for (let i = 0; i < items.length; i++) {
        this[this.length] = items[i];
      }

      return deleted;
    }

    const end = start + toDeleteCount;

    for (let i = start; i < end; i++) {
      deleted = [...deleted, this[start]];

      for (let j = start; j < this.length; j++) {
        this[j] = this[j + 1];
      }

      this.length -= 1;
    }

    if (items.length === 0) {
      return deleted;
    }

    for (let i = this.length - 1; i >= start; i--) {
      this[i + items.length] = this[i];
    }

    for (let i = 0; i < items.length; i++) {
      this[i + start] = items[i];
    }

    return deleted;
  };
}

module.exports = applyCustomSplice;
