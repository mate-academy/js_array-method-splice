'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start = 0,
    deleteCount = this.length - start,
    ...items
  ) {
    const oldArr = [...this];
    let startPoint = start;
    const splicedArr = [];

    if (
      (startPoint === 0
      && deleteCount === this.length - startPoint
      && items.length === 0)
      || start > this.length
      || deleteCount < 0
    ) {
      return splicedArr;
    }

    if (this.length === 0) {
      this.push(...items);
    }

    if (startPoint < 0) {
      startPoint += this.length;
    }

    if (startPoint * -1 > this.length) {
      startPoint = 0;
    }

    if (this.length !== 0 && startPoint > 0) {
      for (let i = startPoint; i <= deleteCount + 1; i++) {
        splicedArr.push(this[i]);
      }
    } else if (startPoint === 0) {
      for (let i = startPoint; i <= deleteCount; i++) {
        splicedArr.push(this[i]);
      }
    }

    do {
      splicedArr.length--;
    } while (splicedArr.includes(undefined));

    this.length = startPoint;

    this.push(...items);

    if (startPoint > 0) {
      for (let i = deleteCount; i < oldArr.length - 1; i++) {
        this.push(oldArr[i + 1]);
      }
    } else {
      for (let i = deleteCount - 1; i < oldArr.length - 1; i++) {
        this.push(oldArr[i + 1]);
      }
    }

    return splicedArr;
  };
}

module.exports = applyCustomSplice;
