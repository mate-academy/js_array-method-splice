'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const deletedItems = [];
    let counter = 0;
    let startIdx = start;
    let delElCount = deleteCount;

    if (startIdx < 0 && (-this.length <= startIdx)) {
      startIdx = this.length + startIdx;
    }

    if (startIdx < 0 && (-this.length >= startIdx)) {
      startIdx = 0;
    }

    if (delElCount === undefined) {
      delElCount = this.length - startIdx;
    }

    if (delElCount > 0) {
      for (let delItemIndex = startIdx;
        delItemIndex < delElCount + startIdx;
        delItemIndex++) {
        deletedItems[counter] = this[delItemIndex];
        if (this[delItemIndex + delElCount] !== undefined) {
          this[delItemIndex] = this[delItemIndex + delElCount];
        }
        counter++;
      }
    }

    if (this[startIdx + delElCount + delElCount] !== undefined) {
      for (let i = 0; i < delElCount; i++) {
        this[startIdx + delElCount + i]
          = this[startIdx + delElCount + delElCount + i];
      }
    }

    if (delElCount > this.length) {
      this.length = 0;
      return delElCount;
    }

    this.length = (this.length - deletedItems.length);

    if ([...items].length > 0) {
      const addingArr = [ ...items ];

      this.length = this.length + addingArr.length;
      for (let k = 0; k < this.length - startIdx; k++) {
        this[this.length - 1 - k]
          = this[this.length - 1 - addingArr.length - k];
      }

      for (let i = 0; i < addingArr.length; i++) {
        this[startIdx + i] = addingArr[i];
      }
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
