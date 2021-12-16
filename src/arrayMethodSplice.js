'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start1 = 0, deleteCount = 0, ...items) {
    if (items.length === 0) {
      return [];
    }

    let start = start1;

    if (start1 + this.length < 0) {
      start = 0;
    } else if (start1 < 0) {
      start += this.length;
    }

    // console.log(this, start, deleteCount, items, '\n newline');

    const arr = [...this];
    const deleted = [];
    let j = 0;
    let k = 0;

    this.length = 0;
    // console.log(this, '0');

    for (let i = 0; i < start; i++) {
      this[i] = arr[i];
    }

    // console.log(this, '1');

    for (let i = start; j < items.length; i++) {
      this[i] = items[j];
      j++;
    }

    // console.log(this, '2');

    j = this.length;

    for (let i = start; i < arr.length; i++) {
      // console.log(i, start + deleteCount);

      if (i < start + deleteCount) {
        deleted[k] = arr[i];
        k++;
        continue;
      }
      this[j] = arr[i];
      j++;
    }

    // console.log(this, deleted);

    return deleted;
  };
}

module.exports = applyCustomSplice;
