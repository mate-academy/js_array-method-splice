'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const initialLength = this.length;
    const argLength = items.length;
    let removedItems = [];
    let buffer = [];
    let actualStartPosition = start;
    let actualDeleteCount = deleteCount;

    if (actualStartPosition === 0) return this;
    if (actualStartPosition < 0) actualStartPosition += initialLength;
    if ((!arguments.length) ||
      (actualDeleteCount === 0 && (!items)) ||
      (actualStartPosition > initialLength)) {
      return removedItems;
    }

    if ((actualStartPosition * -1) > initialLength) {
      removedItems = [...this];
      this.length = 0;
      return removedItems;
    }

    if (actualDeleteCount > initialLength) actualDeleteCount = 0;

    removedItems = this.slice(actualStartPosition);
    this.length = initialLength - (initialLength - actualStartPosition);

    if (actualDeleteCount || actualDeleteCount === 0) {
      buffer = removedItems.slice(actualDeleteCount);
      removedItems = removedItems.slice(0, actualDeleteCount);
      if (argLength > 0) {
        buffer = [...items, ...buffer];
      }
    }
    buffer.forEach(item => this.push(item));
    return removedItems;
  };
}

module.exports = applyCustomSplice;
