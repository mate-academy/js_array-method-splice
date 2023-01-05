'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    startIndex,
    deleteCount,
    ...items
  ) {
    // write code here
    const deleted = [];

    if (startIndex === undefined && deleteCount === undefined) {
      return deleted;
    }

    if (deleteCount < 0) {
      return deleted;
    }

    let start = startIndex || 0;

    if (start < 0) {
      start += this.length;
    }

    if (start < 0) {
      deleted.push(...this);

      this.length = 0;

      return deleted;
    }

    const end = start + deleteCount || this.length;

    for (let i = start; i < end; i++) {
      deleted.push(this[start]);

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
