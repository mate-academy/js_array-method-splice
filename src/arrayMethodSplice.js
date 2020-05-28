'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start = 0, deleteCount = this.length, ...items
  ) {
    const removedElements = [];
    let startIndex = start;

    if (arguments.length === 0) {
      return removedElements;
    } else if (startIndex < 0 && Math.abs(startIndex) > this.length) {
      startIndex = 0;
    } else if (startIndex < 0) {
      startIndex = this.length - Math.abs(startIndex);
    } else if (startIndex > this.length) {
      startIndex = this.length;
    }

    const endIndex = deleteCount === this.length
      ? this.length
      : startIndex + deleteCount;

    for (let i = startIndex; i < endIndex; i++) {
      if (items.length === 0) {
        removedElements.push(this[i]);

        if (deleteCount < this.length) {
          this[i] = this[i + deleteCount];
        }
      } else {
        removedElements.push(this[i]);
        this.length += items.length;
        this[i + items.length] = this[i];
        this[i] = items[i - startIndex];
      }
    }
    this.length -= removedElements.length;

    return removedElements;
  };
}
// applyCustomSplice();
// console.log([0, 1, 2, 3].splice2(1, 2, 'a', 'b', 'c'));
module.exports = applyCustomSplice;
