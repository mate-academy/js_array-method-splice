'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(begin, deleteCount, ...items) {
    const deleted = [];
    const len = this.length;
    let start = begin > len ? len : begin;
    let delCount = deleteCount;

    start = start < 0 ? len + start : start;
    start = start < 0 || start === undefined ? 0 : start;
    start = start === null ? 0 : start;

    if (delCount + start > len || delCount === undefined) {
      delCount = len - start;
    }

    if ((len === 0 && items.length === 0)
      || delCount < 0
      || (deleteCount === undefined && begin === undefined)
      || delCount === null
      || isNaN(delCount)
    ) {
      return deleted;
    }

    for (let i = start; i < start + delCount; i++) {
      deleted.push(this[i]);
    }

    for (let i = start + delCount, j = 0; i < len; i++, j++) {
      this[start + j] = this[i];
    }

    this.length = len - delCount;

    if (items.length && this.length) {
      for (let i = start, j = 0; j < items.length; i++, j++) {
        for (let n = this.length; n > start; n--) {
          this[n] = this[n - 1];
        }
        start++;
        this[i] = items[j];
      }
    } else if (items.length && this.length === 0) {
      for (let i = 0; i < items.length; i++) {
        this[i] = items[i];
      }
    }

    return deleted;
  };
}

module.exports = applyCustomSplice;
