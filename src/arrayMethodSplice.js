'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(startPosition, deleteCount, ...items) {
    let startIndex = startPosition;
    let quantityToRemove = deleteCount;
    const removedItems = [];

    /* check startIndex and quantityToRemove variations, set correct value */

    if ((startPosition === undefined) && (deleteCount === undefined)
    && (items.length === 0)) {
      return [];
    }

    if (startIndex === undefined) {
      startIndex = 0;
    }

    if (startIndex < 0) {
      startIndex += this.length;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    if (startIndex >= this.length) {
      startIndex = this.length;
    }

    if (quantityToRemove > this.length - startIndex) {
      quantityToRemove = this.length - startIndex;
    }

    if (quantityToRemove < 0) {
      quantityToRemove = 0;
    }

    if (quantityToRemove === undefined) {
      quantityToRemove = this.length - startIndex;
    }

    /* select last index for delete operation */
    const lastIndex = startIndex + quantityToRemove;

    /* copy items to result array before delete */
    for (let i = startIndex; i < lastIndex; i++) {
      const indexForResult = i - startIndex;
      const rightItemIndex = i + quantityToRemove;

      removedItems[indexForResult] = this[i];

      /* if i will have non-deleted items on the right,
       i copy them to the starting position */
      if (rightItemIndex < this.length) {
        this[i] = this[rightItemIndex];
      }
    }
    /* cut length */
    this.length -= quantityToRemove;

    /* if there are no items to add. Return deleted items */
    if (items.length === 0) {
      return removedItems;
    }

    /* add new elements */
    if (items.length !== 0) {
      const newLengthMaxIndex = this.length + items.length - 1;
      const rightInnerIndex = startIndex + items.length - 1;

      /* add space for new elements, increasing length.
      and copy the elements that will be to the right of the new ones
      in the right corner */
      for (let i = newLengthMaxIndex; i > rightInnerIndex; i--) {
        this[i] = this[i - items.length];
      }

      /* add new items */
      for (let i = startIndex; i < startIndex + items.length; i++) {
        const indexOfNew = i - startIndex;

        this[i] = items[indexOfNew];
      }

      return removedItems;
    }
  };
}

module.exports = applyCustomSplice;
