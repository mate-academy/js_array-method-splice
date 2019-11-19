'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if ((start === undefined && deleteCount === undefined)
      || (start >= this.length && start !== 0)
      || deleteCount < 0) {
      return [];
    }

    let begin = start === undefined && deleteCount > 0 ? 0 : start;
    begin = begin >= 0 ? begin : this.length + begin;
    begin = begin < 0 ? 0 : begin;
    const delCount = deleteCount
    === undefined ? this.length - begin : deleteCount;

    const result = [];

    for (let i = 0; i < delCount; i++) {
      result[i] = this[i + begin];
    }

    const copyArr = [...this];

    this.length = begin;

    for (let i = 0; i < copyArr.length - begin - delCount; i++) {
      copyArr[i] = copyArr[i + begin + delCount];
    }

    copyArr.length = copyArr.length - begin - delCount;

    for (let i = 0; i < items.length; i++) {
      this[this.length] = items[i];
    }

    for (let i = 0; i < copyArr.length; i++) {
      this[this.length] = copyArr[i];
    }

    return result;
  };
}

module.exports = applyCustomSplice;
