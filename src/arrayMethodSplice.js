'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start,
    deleteCount = this.length,
    ...items
  ) {
    const arr = [];
    const currentDeleteCount = deleteCount < 0 ? 0 : deleteCount;
    let currentStart = start >= 0 ? start > this.length
      ? this.length
      : start : this.length + start < 0
      ? 0
      : this.length + start;

    if (arguments.length === 0) {
      currentStart = this.length;
    } else if (start === undefined) {
      currentStart = 0;
    }

    if (items.length === 0) {
      for (let i = currentStart; i < this.length; i++) {
        if (arr.length < currentDeleteCount) {
          arr.push(this[i]);
        }
        this[i] = this[i + currentDeleteCount];
      }

      this.length = this.length - arr.length;
    } else {
      let j = 0;
      const indexOfLastDeletedElement
      = currentStart + currentDeleteCount > this.length
        ? this.length
        : currentStart + currentDeleteCount;

      for (
        let i = currentStart;
        i < indexOfLastDeletedElement;
        i++) {
        if (arr.length < currentDeleteCount) {
          arr.push(this[i]);
        }
      }

      let prevLength = this.length;

      if (items.length - currentDeleteCount < 0) {
        for (let i = currentStart; i < currentStart + items.length; i++) {
          this[i] = items[j];
          j++;
        }

        for (
          let i = currentStart + items.length;
          i < prevLength + items.length - currentDeleteCount;
          i++
        ) {
          this[i] = this[i + currentDeleteCount - items.length];
        }

        this.length = prevLength + items.length - currentDeleteCount;

        return arr;
      }

      this.length = prevLength + items.length - currentDeleteCount;

      for (let e = this.length - 1; e > indexOfLastDeletedElement; e--) {
        this[e] = this[e - (items.length - currentDeleteCount)];

        if (this[e] === undefined) {
          prevLength = e + 1;
        }
      }

      if (indexOfLastDeletedElement >= prevLength - 1) {
        j = items.length - 1;

        for (let e = prevLength - 1; e >= currentStart; e--) {
          this[e] = items[j];
          j--;
        }
      } else {
        j = 0;

        for (let e = currentStart; e < currentStart + items.length; e++) {
          this[e] = items[j];
          j++;
        }
      }
    }

    return arr;
  };
}

module.exports = applyCustomSplice;
