'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const deleted = [];
    const length = this.length;

    let startPos = Number(start);

    if (isNaN(startPos)) {
      startPos = 0;
    }

    if (start < 0) {
      startPos = start + length;
    }

    startPos = Math.max(0, startPos);
    startPos = Math.min(startPos, length);

    let deleteAmount = Number(deleteCount);

    if (isNaN(deleteAmount)) {
      deleteAmount = start ? length : 0;
    }

    if (deleteCount < 0) {
      deleteAmount = 0;
    } else {
      deleteAmount = Math.min(deleteAmount, length - startPos);
    }

    if (items) {
      const itemsLength = items.length;

      for (let i = startPos; i < startPos + deleteAmount; i++) {
        deleted[i - startPos] = this[i];
      }

      const diff = deleteAmount - itemsLength;

      if (diff > 0) {
        for (let i = startPos + deleteAmount; i < length; i++) {
          this[i - diff] = this[i];
        }
        this.length -= diff;
      } else if (diff < 0) {
        this.length -= diff;

        for (let i = length - 1; i >= startPos + deleteAmount; i--) {
          this[i - diff] = this[i];
        }
      }

      for (let i = 0; i < itemsLength; i++) {
        this[startPos + i] = items[i];
      }
    }

    return deleted;
  };
}

module.exports = applyCustomSplice;
