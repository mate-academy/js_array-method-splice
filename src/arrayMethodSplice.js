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
    const copyArr1 = [...this];
    const copyArr2 = [...this];

    copyArr1.length = begin;

    for (let i = 0; i < copyArr2.length - begin - delCount; i++) {
      copyArr2[i] = copyArr2[i + begin + delCount];
    }

    copyArr2.length = copyArr2.length - begin - delCount;

    for (let i = 0; i < items.length; i++) {
      copyArr1[copyArr1.length] = items[i];
    }

    for (let i = 0; i < copyArr2.length; i++) {
      copyArr1[copyArr1.length] = copyArr2[i];
    }

    const result = [];

    for (let i = 0; i < delCount; i++) {
      result[i] = this[i + begin];
    }

    for (let i = 0; i < copyArr1.length; i++) {
      this[i] = copyArr1[i];
    }

    this.length = copyArr1.length;

    return result;
  };
}

module.exports = applyCustomSplice;
