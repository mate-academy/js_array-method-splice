'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const slicedArr = [];

    if (arguments.length === 0) {
      return slicedArr;
    }

    let newStart = start || 0;
    let newDeleteCount = deleteCount || 0;
    const deletedElements = [];

    if (newStart < 0) {
      newStart += this.length;
    }

    if (newStart < -this.length) {
      newStart = 0;
    }

    if (newStart >= this.length) {
      newDeleteCount = 0;
      newStart = this.length;
    }

    if (newDeleteCount < 0) {
      newDeleteCount = 0;
    }

    if (arguments.length === 1 || newDeleteCount > this.length - newStart) {
      newDeleteCount = this.length - newStart;
    }

    for (let i = newStart + newDeleteCount, y = 0; i < this.length; i++, y++) {
      deletedElements[y] = this[i];
    }

    for (let i = newStart, y = 0; i < newDeleteCount + newStart; i++, y++) {
      slicedArr[y] = this[i];
    }

    this.length = newStart;

    for (let i = this.length, y = 0; y < items.length; i++, y++) {
      this[i] = items[y];
    }

    for (let i = this.length, y = 0; y < deletedElements.length; i++, y++) {
      this[i] = deletedElements[y];
    }

    return slicedArr;
  };
}

module.exports = applyCustomSplice;
