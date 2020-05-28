'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    // write code here
    if (!arguments.length || deleteCount < 0) {
      return [];
    }

    // check if start index is greater than length of the array
    let changedStart = start > this.length ? this.length : start;

    // handle negative start index values
    changedStart = this.length + changedStart < 0 ? 0 : changedStart;

    if (changedStart < 0) {
      changedStart += this.length;
    }
    // delete count

    let changedDeleteCount = deleteCount;

    if (changedDeleteCount === undefined) {
      changedDeleteCount = this.length - changedStart;
    }

    if (items === undefined) {
      items.length = 0;
    }

    const deletedValues = [];
    // length of the array that should be after splice operations
    const desirableLength = this.length - changedDeleteCount + items.length;

    if (desirableLength < this.length) {
      // how many iterations should script do
      const timeToStop = changedStart + changedDeleteCount;
      // how many elements should script move to the left
      let elementsToMove = this.length - timeToStop;

      for (let i = changedStart; i <= timeToStop; i++) {
        if (deletedValues.length < changedDeleteCount) {
          deletedValues[deletedValues.length] = this[i];
        }

        const addedElementsCounter = i - changedStart;

        if (items.length) {
          if (addedElementsCounter < items.length) {
            this[i] = items[addedElementsCounter]; // counter = i-changeddStart?
          }
        }
        // if first parameter undefined

        if (changedStart === 0) {
          this[i] = this[i + changedDeleteCount];
        } else if (elementsToMove
          && deletedValues.length === changedDeleteCount) {
          this[i - 1 + items.length - 1 + elementsToMove]
          = this[i - 1 + changedDeleteCount];
          elementsToMove--;
        }
      }
      /* after shifting elements to the left and adding removed elements
      to the specific array, we could modify our array */
      this.length = desirableLength;
    } else {
      // at the beginning we can change our array length
      this.length = desirableLength;
      // how much elements should we remove

      let amountToRemove = changedDeleteCount;
      // how much indexes to the left should we move our elements
      let amountToMove = desirableLength - items.length - 1;

      for (let i = changedStart; i < this.length; i++) {
        if (amountToRemove) {
          deletedValues[deletedValues.length] = this[i];
          amountToRemove--;
        }

        if (amountToMove > 0) {
          this[i + items.length] = this[i + changedDeleteCount];
          amountToMove--;
        }

        const addedElementsCounter = i - changedStart;

        if (addedElementsCounter < items.length) {
          this[i] = items[addedElementsCounter];
        }
      }
    }

    return deletedValues;
  };
}

applyCustomSplice();

module.exports = applyCustomSplice;
