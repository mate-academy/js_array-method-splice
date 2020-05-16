'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const deletedItems = [];
    let startPoint = start;

    if (!arguments.length) {
      return deletedItems;
    }

    if (start > this.length) {
      startPoint = this.length;
    }

    if (start < 0) {
      startPoint = this.length + start;
    }

    if (startPoint < 0 || startPoint === undefined) {
      startPoint = 0;
    }

    let deleteIndex = startPoint;
    let deleteAmount = deleteCount;

    if (
      deleteAmount === undefined
      || deleteAmount >= this.length - startPoint
    ) {
      deleteAmount = this.length - startPoint;
    }

    if (deleteAmount <= 0) {
      deleteAmount = 0;
    }

    while (deleteAmount > 0) {
      deletedItems.push(this[deleteIndex]);
      deleteIndex++;
      deleteAmount--;
    }

    for (let i = startPoint; i < this.length; i++) {
      this[i] = this[i + deletedItems.length];
    }

    this.length = this.length - deletedItems.length;

    this.length = this.length + items.length;

    for (let i = this.length - 1; i > startPoint; i--) {
      this[i] = this[i - items.length];
    }

    for (let i = startPoint; i < startPoint + items.length; i++) {
      this[i] = items[i - startPoint];
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
