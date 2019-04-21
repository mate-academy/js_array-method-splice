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

    if (!arguments.length) return removedItems;
    if (start < 0) start += initialLength;
    if ((start * -1) > initialLength) {
      removedItems = [...this];
      this.length = 0;
      return removedItems;
    }
    if (start === 0) return this;
    if (start > initialLength) return removedItems;

    if (deleteCount > initialLength) deleteCount = 0;
    if (deleteCount === 0 && (!items)) return removedItems;

    removedItems = this.slice(start);
    this.length = initialLength - (initialLength - start);

    if (deleteCount || deleteCount === 0) {
      buffer = removedItems.slice(deleteCount);
      removedItems = removedItems.slice(0, deleteCount);
      if (argLength > 0) {
        buffer = [...items, ...buffer];
      }
    }
    buffer.forEach(item => this.push(item));
    return removedItems;
  };
}

applyCustomSplice();
let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
a.splice2();
// [0,1,2,3,4,5,6].splice2(2)
module.exports = applyCustomSplice;
