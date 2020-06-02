'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start = 0, deleteCount = this.length, ...items
  ) {
    const removedElements = [];
    let startIndex = start;

    if (arguments.length === 0) {
      return removedElements;
    } else if (startIndex < 0 && Math.abs(startIndex) > this.length) {
      startIndex = 0;
    } else if (startIndex < 0) {
      startIndex = this.length - Math.abs(startIndex);
    } else if (startIndex > this.length) {
      startIndex = this.length;
    }

    const endIndex = deleteCount >= this.length
      ? this.length
      : startIndex + deleteCount;

    const addedEndIndex = deleteCount === 1 ? 2 : 0;

    for (let i = startIndex; i < endIndex + addedEndIndex; i++) {
      if (i < endIndex) {
        removedElements.push(this[i]);
      }
      this[i] = this[i + deleteCount];
    }
    this.length -= removedElements.length;

    if (items.length > 0) {
      this.length += items.length;

      for (
        let i = startIndex, itemIndex = 0;
        itemIndex < items.length;
        i++, itemIndex++
      ) {
        if (i + items.length < this.length) {
          this[i + items.length] = this[i];
        }
        this[i] = items[itemIndex];
      }
    }

    return removedElements;
  };
}

module.exports = applyCustomSplice;
