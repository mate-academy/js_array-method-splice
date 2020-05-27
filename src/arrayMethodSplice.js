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
    const desirableLength = this.length - changedDeleteCount + items.length;

    if (desirableLength < this.length) {
      const timeToStop = changedStart + changedDeleteCount;
      let elementsToMove = this.length - timeToStop;

      for (let i = changedStart; i <= timeToStop; i++) {
        if (deletedValues.length < changedDeleteCount) {
          deletedValues[deletedValues.length] = this[i];
        }
        // console.log(this[i]);

        if (items.length) {
          if (i - changedStart < items.length) {
            this[i] = items[i - changedStart]; // counter = i-changeddStart?
          }
        }

        if (changedStart === 0) {
          this[i] = this[i + changedDeleteCount];
        } else if (elementsToMove
          && deletedValues.length === changedDeleteCount) {
          this[i - 1 + items.length - 1 + elementsToMove]
          = this[i - 1 + changedDeleteCount];
          elementsToMove--;
        }
      }

      this.length = desirableLength;
    } else {
      this.length = desirableLength;

      let amountToRemove = changedDeleteCount;
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

        if (i - changedStart < items.length) {
          this[i] = items[i - changedStart]; // counter = i-changeddStart?
        }
      }
    }

    return deletedValues;
  };
}

module.exports = applyCustomSplice;
