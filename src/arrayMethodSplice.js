'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if ((start === undefined && deleteCount === undefined)
      || start > this.length
      || deleteCount < 0) {
      return [];
    }

    const fromIndex = Math.abs(start) < this.length
      ? start + (start < 0 && this.length)
      : 0;

    let indexToDelete = deleteCount <= this.length
      ? fromIndex + (deleteCount || 0)
      : this.length;

    if (items.length && deleteCount === undefined) {
      indexToDelete = fromIndex;
    }

    const toIndex = items.length
      ? this.length + items.length - (indexToDelete - fromIndex)
      : indexToDelete;

    const original = [...this];
    let deleted = [];

    let counter = 0;
    let indexToFind = 0;

    for (let i = fromIndex; i < toIndex; i++) {
      if (i < indexToDelete) {
        deleted = [...deleted, this[i]];
      }

      if (items.length && counter < items.length) {
        this[i] = items[counter];
        counter++;
      } else {
        this[i] = original[indexToDelete + indexToFind];
        indexToFind++;
      }
    }

    if (items.length) {
      this.length = toIndex;
    } else {
      this.length -= toIndex - fromIndex;
    }

    return deleted;
  };
}

module.exports = applyCustomSplice;
