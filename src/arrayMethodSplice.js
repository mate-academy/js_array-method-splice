'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let numberToRemove = 0;
    let startIndex = 0;
    let removed = [];

    if (start === undefined && deleteCount === undefined) {
      return [];
    }

    if (start > this.length) {
      startIndex = this.length;
    } else if (start < 0) {
      startIndex = (start + this.length) > 0 ? (start + this.length) : 0;
    } else if (start === undefined) {
      startIndex = 0;
    } else {
      startIndex = start;
    }

    if (!deleteCount && deleteCount !== 0) {
      numberToRemove = this.length - startIndex;
    } else if (deleteCount >= this.length - startIndex) {
      removed = [...this];
      this.length = 0;
    } else if (deleteCount <= 0) {
      numberToRemove = 0;
    } else {
      numberToRemove = deleteCount;
    }

    if (numberToRemove > 0) {
      for (let i = 0; i < numberToRemove; i++) {
        removed[removed.length] = this[startIndex + i];
        this[startIndex + i] = this[startIndex + numberToRemove + i];
      }
      this.length = this.length - numberToRemove;
    }

    const newLength = this.length + items.length;
    const originalLength = this.length;

    if (items.length > 0) {
      for (let j = 1; j <= newLength - items.length - startIndex; j++) {
        this[newLength - j] = this[originalLength - j];
      }

      for (let k = 0; k < items.length; k++) {
        this[startIndex + k] = items[k];
      }
    }

    return removed;
  };
}

module.exports = applyCustomSplice;
