'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start = 0,
    deleteCount = this.length,
    ...items
  ) {
    if (arguments.length === 0) {
      return [];
    }

    if (deleteCount < 0) {
      return [];
    }

    const splisedEl = [];
    const elAfterSpliced = [];
    let startIndex = start;
    let howManyToDelete = deleteCount;

    if (startIndex < 0) {
      startIndex += this.length;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (startIndex > this.length) {
      startIndex = 0;
      howManyToDelete = 0;
    }

    for (let i = 0; i < this.length; i++) {
      if (i >= startIndex && i < startIndex + howManyToDelete) {
        splisedEl.push(this[i]);
      } else if (i >= startIndex + howManyToDelete) {
        elAfterSpliced.push(this[i]);
      }
    }

    this.length = startIndex;

    this.push(...items, ...elAfterSpliced);

    return splisedEl;
  };
}

module.exports = applyCustomSplice;
