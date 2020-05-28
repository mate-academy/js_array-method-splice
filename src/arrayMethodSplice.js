'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const length = this.length;
    let modified = [];
    let startIndex = start;
    let deleteCountIndex = deleteCount;
    let modifiedIndex = 0;

    if (arguments.length === 0) {
      return modified;
    }

    if (startIndex === undefined) {
      startIndex = 0;
    }

    if (startIndex < 0) {
      if ((startIndex * -1) > length) {
        startIndex = 0;
      } else {
        startIndex = length + startIndex;
      }
    } else if (startIndex > length) {
      startIndex = length;
    }

    if (!deleteCountIndex && deleteCountIndex !== 0) {
      for (let i = startIndex; i < length; i++) {
        modified[modifiedIndex] = this[i];
        modifiedIndex++;
      }
      this.length = startIndex;

      return modified;
    }

    if (items.length === 0) {
      if (deleteCountIndex > length - startIndex) {
        return this.splice2(startIndex);
      } else if (deleteCountIndex < 1) {
        return modified;
      }

      const tail = this.splice2(startIndex);

      for (let i = 0; i < deleteCountIndex; i++) {
        modified[i] = tail[i];
      }

      for (let i = deleteCountIndex; i < tail.length; i++) {
        this[startIndex] = tail[deleteCountIndex];
        startIndex++;
        deleteCountIndex++;
      }

      return modified;
    }

    const tailItems = this.splice2(startIndex + deleteCountIndex);

    modified = this.splice2(startIndex);

    for (let i = 0; i < items.length; i++) {
      this[startIndex] = items[i];
      startIndex++;
    }

    for (let i = 0; i < tailItems.length; i++) {
      this[startIndex] = tailItems[i];
      startIndex++;
    }

    return modified;
  };
}

module.exports = applyCustomSplice;
