'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start = 0, deleteCount = this.length, ...items) {
    if (arguments.length === 0) {
      return [];
    }

    const spliced = [];
    let startIndex = start;

    if (startIndex < 0) {
      startIndex += this.length;

      if (startIndex < 0) {
        startIndex = 0;
      }
    } else if (startIndex > this.length) {
      startIndex = this.length;
    }

    const endIndex = deleteCount === this.length
      ? this.length
      : deleteCount + startIndex;

    for (let i = startIndex; i < endIndex; i++) {
      spliced.push(this[i]);

      if (endIndex < this.length) {
        this[i] = this[i + deleteCount];
      }
    }

    this.length -= spliced.length;

    if (items.length > 0) {
      let itemsIndex = 0;

      this.length += items.length;

      for (let i = startIndex; itemsIndex < items.length; i++) {
        if (i + items.length < this.length) {
          this[i + items.length] = this[i];
        }
        this[i] = items[itemsIndex++];
      }
    }

    return spliced;
  };
}

module.exports = applyCustomSplice;
