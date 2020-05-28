'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const initialLength = this.length;
    let startIndex = start;
    let deleted = [];

    if (arguments.length === 0) {
      return deleted;
    }

    if (startIndex === undefined) {
      startIndex = 0;
    }

    if (startIndex < 0) {
      if ((startIndex * -1) > initialLength) {
        startIndex = 0;
      } else {
        startIndex = initialLength + startIndex;
      }
    } else if (startIndex > initialLength) {
      startIndex = initialLength;
    }

    if (!deleteCount && deleteCount !== 0) {
      for (let i = startIndex; i < initialLength; i++) {
        deleted[i - startIndex] = this[i];
      }
      this.length = startIndex;

      return deleted;
    }

    if (items.length === 0) {
      if (deleteCount > initialLength - startIndex) {
        return this.splice2(startIndex);
      } else if (deleteCount < 1) {
        return deleted;
      }

      const tail = this.splice2(startIndex);

      for (let i = 0; i < deleteCount; i++) {
        deleted[i] = tail[i];
      }

      for (let i = deleteCount; i < tail.length; i++) {
        this[startIndex - deleteCount + i] = tail[i];
      }

      return deleted;
    }

    const tailItems = this.splice2(startIndex + deleteCount);

    deleted = this.splice2(startIndex);

    for (let i = 0; i < items.length; i++) {
      this[startIndex + i] = items[i];
    }

    for (let i = 0; i < tailItems.length; i++) {
      this[startIndex + items.length + i] = tailItems[i];
    }

    return deleted;
  };
}

module.exports = applyCustomSplice;
