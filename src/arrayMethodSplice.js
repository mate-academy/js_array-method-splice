'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const length = this.length;
    let modified = [];
    let startIndex = start;
    const deleteCountIndex = deleteCount;

    if (arguments.length === 0) {
      return modified;
    }

    if (startIndex === undefined) {
      startIndex = 0;
    }

    if (!deleteCountIndex && deleteCountIndex !== 0) {
      if (startIndex < 0) {
        if ((startIndex * -1) > length) {
          startIndex = 0;
        } else {
          startIndex = length + startIndex;
        }
      } else if (startIndex > length) {
        startIndex = length;
      }

      for (let i = startIndex; i < length; i++) {
        modified.push(this[i]);
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
        modified.push(tail.shift());
      }

      while (tail.length !== 0) {
        this.push(tail.shift());
      }

      return modified;
    }

    const tailItems = this.splice2(startIndex + deleteCountIndex);

    modified = this.splice2(startIndex);

    for (let i = 0; i < items.length; i++) {
      this.push(items[i]);
    }

    while (tailItems.length !== 0) {
      this.push(tailItems.shift());
    }

    return modified;
  };
}

module.exports = applyCustomSplice;
