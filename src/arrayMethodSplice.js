'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (arguments.length === 0) {
      return [];
    };

    const validatedStart = start > this.length ? this.length
      : start >= 0 ? start
        : start == null || Math.abs(start) > this.length ? 0
          : start + this.length;
    const validatedDelete = deleteCount >= this.length - validatedStart
      || deleteCount === undefined ? this.length - validatedStart
      : deleteCount < 0 ? 0 : deleteCount;
    const deletedItems = [];

    for (let n = validatedStart; n < validatedStart + validatedDelete; n++) {
      deletedItems[deletedItems.length] = this[n];
    }

    let curIndex = validatedStart;

    for (validatedStart;
      curIndex < validatedStart + Math.min(validatedDelete, items.length);
      curIndex++) {
      this[curIndex] = items[curIndex - validatedStart];
    }

    const difference = Math.abs(validatedDelete - items.length);

    if (validatedDelete > items.length) {
      for (curIndex; curIndex <= this.length - difference; curIndex++) {
        this[curIndex] = this[curIndex + difference];
      }

      this.length = this.length === 0 ? 0 : this.length - difference;
    }

    if (validatedDelete < items.length) {
      for (let i = this.length - 1; i >= curIndex; i--) {
        this[i + difference] = this[i];
      }

      for (curIndex; curIndex < items.length + validatedStart; curIndex++) {
        this[curIndex] = items[curIndex - validatedStart];
      }
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
