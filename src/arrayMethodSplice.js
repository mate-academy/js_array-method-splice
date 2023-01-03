'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const removedCount = deleteCount;
    let startIndex = start;

    if (
      (start === undefined)
      && (deleteCount === undefined)
      && (items.length === 0)
    ) {
      return [];
    }

    if (startIndex < 0) {
      startIndex += this.length;
    }

    if ((startIndex < -this.length) || (startIndex === undefined)) {
      startIndex = 0;
    }

    if (startIndex >= this.length) {
      startIndex = this.length;
    }

    let stopIndex = startIndex + removedCount;

    if (deleteCount === undefined) {
      stopIndex = this.length;
    }

    if ((start === undefined) && (deleteCount === undefined)) {
      stopIndex = 0;
    }

    // removing items

    const indexesToRemove = {};
    const indexesLeft = {};

    for (let i = startIndex; i < stopIndex; i++) {
      indexesToRemove[i] = this[i];
    }

    for (let i = 0; i < this.length; i++) {
      if (!indexesToRemove.hasOwnProperty(i)) {
        indexesLeft[i] = this[i];
      }
    }

    for (let i = 0; i < this.length; i++) {
      this[i] = Object.values(indexesLeft)[i];
    }

    this.length = Object.values(indexesLeft).length;

    // adding new items
    const thisNewLength = this.length + items.length - 1;

    for (let i = thisNewLength; i > startIndex + items.length - 1; i--) {
      this[i] = this[i - items.length];
    }

    for (let i = startIndex; i < startIndex + items.length; i++) {
      this[i] = items[i - startIndex];
    }

    return Object.values(indexesToRemove);
  };
}

module.exports = applyCustomSplice;
