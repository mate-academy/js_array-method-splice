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
    const lenItems = items.length;

    start = start < 0 ? len + start : start;
    start = start < 0 || start === undefined ? 0 : start;
    start = start === null ? 0 : start;

    if (delCount + start > len || delCount === undefined) {
      delCount = len - start;
    }

    if ((begin === undefined && deleteCount === undefined && lenItems)) {
      delCount = 0;
    }

    if ((len === 0 && lenItems === 0)
      || delCount < 0
      || arguments.length === 0
      || (begin === undefined && deleteCount === undefined && lenItems === 0)
      || (delCount === null && lenItems === 0)
      || (isNaN(delCount) && lenItems === 0)
    ) {
      return deleted;
    }

    for (let i = start; i < start + delCount; i++) {
      deleted[deleted.length] = this[i];
    }

    for (let i = start + delCount, j = 0; i < len; i++, j++) {
      this[start + j] = this[i];
    }

    if (delCount > 0) {
      this.length = len - delCount;
    }

    if (lenItems && this.length) {
      for (let i = start, j = 0; j < lenItems; i++, j++) {
        for (let n = this.length; n > start; n--) {
          this[n] = this[n - 1];
        }
        start++;
        this[i] = items[j];
      }
    } else if (lenItems && this.length === 0) {
      for (let i = 0; i < lenItems; i++) {
        this[i] = items[i];
      }
    }

    return deleted;
  };
}

module.exports = applyCustomSplice;
