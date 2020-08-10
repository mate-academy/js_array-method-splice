'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start,
    deleteCount, ...items) {
    let delCount = deleteCount || this.length - start;
    let startIndex = start || 0;
    let lastDeletedIndex = startIndex + delCount;
    const added = [...items];
    let deleted = [];
    const afterDeleted = [];

    if (startIndex > this.length
      || (start === undefined && deleteCount === undefined)
      || delCount < 0) {
      return [];
    }

    if (Math.abs(startIndex) > this.length) {
      deleted = [...this];
      this.length = 0;

      return deleted;
    }

    if (startIndex < 0) {
      if (delCount === this.length - start) {
        delCount = Math.abs(start);
      }
      startIndex += this.length;
      lastDeletedIndex = startIndex + delCount;
    }

    for (let i = startIndex, j = 0; j < delCount; i++, j++) {
      deleted[j] = this[i];
    }

    for (let i = 0; i < startIndex; i++) {
      added.unshift(this[i]);
    }

    if (deleteCount === 0) {
      lastDeletedIndex = startIndex;
      deleted.length = 0;
    }

    for (let i = lastDeletedIndex; i < this.length; i++) {
      afterDeleted.push(this[i]);
    }

    this.length = 0;
    this.push(...added, ...afterDeleted);

    return deleted;
  };
}

module.exports = applyCustomSplice;
