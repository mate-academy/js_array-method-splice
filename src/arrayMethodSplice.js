'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let idxStart = start;
    let deleteCountChanged = deleteCount;
    const removedItems = [];
    const lastPart = [];
    let countItems = 0;

    if ((start === undefined && deleteCount === undefined)
      || deleteCountChanged < 0) {
      return removedItems;
    }

    if (idxStart === undefined) {
      idxStart = 0;
    }

    while (idxStart < 0) {
      idxStart = this.length + idxStart;
    }

    if (idxStart > this.length) {
      idxStart = this.length;
    }

    if (deleteCountChanged === undefined
      || deleteCountChanged > this.length - start) {
      deleteCountChanged = this.length - idxStart;
    }

    const newLength = this.length + items.length - deleteCountChanged;

    for (let j = idxStart; j < deleteCountChanged + idxStart; j++) {
      removedItems[countItems] = this[j];
      countItems++;
    }

    countItems = 0;

    for (let k = deleteCountChanged + idxStart; k < this.length; k++) {
      lastPart[countItems] = this[k];
      countItems++;
    }

    countItems = 0;

    for (let z = idxStart; z < idxStart + items.length; z++) {
      this[z] = items[countItems];
      countItems++;
    }

    countItems = 0;

    for (let y = idxStart + items.length; y < newLength; y++) {
      this[y] = lastPart[countItems];
      countItems++;
    }

    this.length = newLength;

    return removedItems;
  };
}

module.exports = applyCustomSplice;
