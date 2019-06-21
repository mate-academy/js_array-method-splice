'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const deletedItems = [];
    let counter = 0;
    let startIndex = start;
    let delElementCount = deleteCount;

    if (startIndex < 0) {
      startIndex += this.length;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (delElementCount === undefined) {
      delElementCount = this.length - startIndex;
    }

    for (
      let delItemIndex = startIndex;
      delItemIndex < delElementCount + startIndex;
      delItemIndex++
    ) {
      deletedItems[counter] = this[delItemIndex];
      counter++;
    }

    if (startIndex + delElementCount < this.length) {
      for (let i = 0; i < this.length - (delElementCount + startIndex); i++) {
        this[startIndex + i] = this[startIndex + delElementCount + i];
      }
    }

    if (delElementCount > this.length) {
      this.length = 0;
      return delElementCount;
    }

    this.length = (this.length - deletedItems.length);

    if (items.length > 0) {
      const addingArr = [ ...items ];

      this.length = this.length + addingArr.length;
      for (let k = 0; k < this.length - startIndex; k++) {
        this[this.length - 1 - k]
          = this[this.length - 1 - addingArr.length - k];
      }

      for (let i = 0; i < addingArr.length; i++) {
        this[startIndex + i] = addingArr[i];
      }
    }

    return deletedItems;
  };
}

module.exports = applyCustomSplice;
