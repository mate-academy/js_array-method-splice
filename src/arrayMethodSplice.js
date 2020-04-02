'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const rest = [];
    const spliced = [];
    let startIndex = start;
    let delQty = deleteCount;
    const addQty = (items) ? items.length : 0;

    if (
      start > this.length
      || (start === undefined && deleteCount === undefined)
      || deleteCount < 0
    ) {
      return [];
    }

    if (start === undefined) {
      startIndex = 0;
    }

    if (start < 0) {
      startIndex = this.length + start;
    }

    if (this.length + start < 0) {
      for (let i = 0; i < this.length; i++) {
        spliced[i] = this[i];
      }

      this.length = 0;

      return spliced;
    }

    if (deleteCount === undefined) {
      delQty = this.length - startIndex;
    }

    for (let i = startIndex + delQty; i < this.length; i++) {
      rest.push(this[i]);
    }

    for (let i = startIndex; i < startIndex + delQty; i++) {
      spliced[i - startIndex] = this[i];
    }

    this.length = this.length - delQty + addQty;

    for (let i = 0; i < items.length; i++) {
      this[i + startIndex] = items[i];
    }

    for (let i = 0; i < rest.length; i++) {
      this[i + startIndex + items.length] = rest[i];
    }

    return spliced;
  };
}

module.exports = applyCustomSplice;
