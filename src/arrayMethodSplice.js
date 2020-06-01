'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    const initialLength = this.length;
    let deleted = [];
    let tail = [];
    let startIndex = start >= 0 ? start : start + initialLength;

    startIndex = startIndex < 0 ? 0 : startIndex;
    startIndex = startIndex > initialLength ? initialLength : startIndex;

    if (arguments.length === 0) {
      return deleted;
    }

    if (deleteCount === undefined) {
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

      tail = this.splice2(startIndex);

      for (let i = 0; i < deleteCount; i++) {
        deleted[i] = tail[i];
      }

      for (let i = deleteCount; i < tail.length; i++) {
        this[startIndex - deleteCount + i] = tail[i];
      }

      return deleted;
    }

    tail = this.splice2(startIndex + deleteCount);

    deleted = this.splice2(startIndex);

    for (let i = 0; i < items.length; i++) {
      this[startIndex + i] = items[i];
    }

    for (let i = 0; i < tail.length; i++) {
      this[startIndex + items.length + i] = tail[i];
    }

    return deleted;
  };
}

module.exports = applyCustomSplice;
