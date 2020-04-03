'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    // write code here
    const deletedItems = [];

    if (arguments.length === 0) {
      return deletedItems;
    }

    let indexStart;

    if (start === undefined) {
      indexStart = 0;
    } else if (start > this.length) {
      indexStart = this.length;
    } else if (this.length + start < 0) {
      indexStart = 0;
    } else if (start < 0) {
      indexStart = this.length + start;
    } else {
      indexStart = start;
    }

    if (arguments.length === 1) {
      for (let i = indexStart; i < this.length; i++) {
        deletedItems.push(this[i]);
      }

      this.length = indexStart;
    } else if (deleteCount > 0) {
      let remove = deleteCount;

      if (deleteCount + indexStart > this.length) {
        remove = this.length - indexStart;
      }

      for (let i = indexStart; i < this.length; i++) {
        if (i <= indexStart + remove - 1) {
          deletedItems.push(this[i]);
        }

        this[i] = this[i + remove];
      }

      this.length -= remove;
    }

    if (arguments.length > 2) {
      for (let i = this.length - 1; i >= indexStart; i--) {
        this[i + items.length] = this[i];
      }

      for (let i = 0; i < items.length; i++) {
        this[indexStart + i] = items[i];
      }
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
