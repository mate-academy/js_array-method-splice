'use strict';

/**
 * Implement method Splice
 */

function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const result = [];
    const deletedItems = [];

    if (arguments.length === 0
      || (deleteCount < 0)
      || ((start >= this.length) && start !== 0)) {
      return deletedItems;
    }

    let startSearch = start;

    if ((startSearch === undefined) || -startSearch > this.length) {
      startSearch = 0;
    } else if (startSearch < 0) {
      startSearch = this.length + start;
    }

    if (deleteCount === undefined) {
      for (let i = startSearch; i < this.length; i++) {
        deletedItems[deletedItems.length] = this[i];
      }
      this.length = startSearch;

      return deletedItems;
    }

    for (let i = startSearch; i < startSearch + deleteCount; i++) {
      deletedItems[deletedItems.length] = this[i];
    }

    for (let i = 0; i < startSearch; i++) {
      result[result.length] = this[i];
    }

    for (let i = 0; i < items.length; i++) {
      result[result.length] = items[i];
    }

    for (let i = startSearch + deleteCount; i < this.length; i++) {
      result[result.length] = this[i];
    }

    for (let i = 0; i < result.length; i++) {
      this[i] = result[i];
    }

    this.length = result.length;

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
