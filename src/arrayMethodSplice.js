'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start = 0, deleteCount, ...items
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

    let endIndex;

    if (deleteCount < 0) {
      return removedElements;
    } else if (deleteCount >= this.length || deleteCount === undefined) {
      endIndex = this.length;
    } else {
      endIndex = startIndex + deleteCount;
    }

    if (deleteCount !== undefined || arguments.length <= 1) {
      for (let i = startIndex; i < this.length; i++) {
        if (i < endIndex) {
          removedElements.push(this[i]);
        }
        this[i] = this[i + deleteCount];
      }
      this.length -= removedElements.length;
    }

    if (items.length > 0) {
      this.length += items.length;

      for (let i = this.length - 1; i >= startIndex; i--) {
        if (i >= items.length + startIndex) {
          this[i] = this[i - items.length];
        } else {
          this[i] = items[i - startIndex];
        }
      }
    }

    return removedElements;
  };
}

module.exports = applyCustomSplice;
