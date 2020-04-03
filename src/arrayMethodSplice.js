'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let startFrom = start;

    if (start === undefined && deleteCount === undefined) {
      return [];
    } else if (start > this.length) {
      startFrom = this.length;
    } else if (start < -this.length || start === undefined) {
      startFrom = 0;
    } else if (start < 0) {
      startFrom += this.length;
    } else if (this.length === 0) {
      for (let i = 0; i < items.length; i++) {
        this[i] = items[i];
      }

      return [];
    }

    let deletedItems = [];
    let toDelete = this.length - startFrom;

    // for one parameter start
    if (!deleteCount && items.length === 0) {
      for (let i = startFrom; i < this.length; i++) {
        deletedItems[i - startFrom] = this[i];
      }
    }

    // for two parameters start, deleteCount
    if (deleteCount >= this.length - startFrom) {
      deletedItems = [...this];
      this.length = 0;

      return deletedItems;
    } else if (deleteCount < 0) {
      return [];
    }

    if (deleteCount && items.length === 0) {
      toDelete = deleteCount;

      for (let i = startFrom; i < toDelete + startFrom; i++) {
        deletedItems[i - startFrom] = this[i];
        this[i] = this[i + toDelete];
      }
    }

    // for all parameters
    if (items.length > 0 || items === undefined) {
      const storedItems = [];
      let itemsLength;

      toDelete = deleteCount;

      if (items === undefined) {
        itemsLength = 1;
      } else {
        itemsLength = items.length;
      }

      for (let i = startFrom + toDelete; i < this.length; i++) {
        storedItems[i - startFrom - toDelete] = this[i];
      }

      for (let i = startFrom; i < toDelete + startFrom; i++) {
        deletedItems[i - startFrom] = this[i];
      }

      for (let i = startFrom; i < itemsLength + startFrom; i++) {
        this[i] = items[i - startFrom];
      }

      for (let i = startFrom + itemsLength;
        i < startFrom + itemsLength + storedItems.length;
        i++) {
        this[i] = storedItems[i - startFrom - itemsLength];
      }

      this.length = startFrom + itemsLength + storedItems.length;

      return deletedItems;
    }

    this.length -= toDelete;

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
